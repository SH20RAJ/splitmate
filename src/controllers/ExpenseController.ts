import Expense, { IExpense } from '../models/Expense';
import ExpenseParticipant from '../models/ExpenseParticipant';
import GroupMember from '../models/GroupMember';
import Activity from '../models/Activity';
import { Types } from 'mongoose';

export class ExpenseController {
  // Create a new expense
  static async createExpense(expenseData: {
    groupId: string;
    name: string;
    description?: string;
    amount: number;
    currency: string;
    category: string;
    paidById: string;
    receiptUrl?: string;
    splitType: 'equal' | 'percentage' | 'amount' | 'custom';
    expenseDate: Date;
    participants: Array<{
      userId: string;
      shareAmount: number;
      sharePercentage?: number;
    }>;
  }) {
    const session = await Expense.startSession();
    session.startTransaction();
    
    try {
      const {
        groupId,
        name,
        description,
        amount,
        currency,
        category,
        paidById,
        receiptUrl,
        splitType,
        expenseDate,
        participants
      } = expenseData;
      
      // Validate group membership
      const isMember = await GroupMember.exists({ groupId, userId: paidById });
      if (!isMember) {
        throw new Error('User is not a member of this group');
      }
      
      // Create expense
      const expense = new Expense({
        groupId,
        name,
        description,
        amount,
        currency,
        category,
        paidById,
        receiptUrl,
        splitType,
        expenseDate,
        status: 'pending'
      });
      
      await expense.save({ session });
      
      // Create expense participants
      const participantDocs = participants.map(participant => ({
        expenseId: expense._id,
        userId: participant.userId,
        shareAmount: participant.shareAmount,
        sharePercentage: participant.sharePercentage,
        isPaid: participant.userId === paidById
      }));
      
      await ExpenseParticipant.insertMany(participantDocs, { session });
      
      // Update group member balances
      for (const participant of participants) {
        const shareAmount = participant.shareAmount;
        const userId = participant.userId;
        
        // Skip updating balance for the person who paid
        if (userId === paidById) continue;
        
        // Update participant's balance (they owe money)
        await GroupMember.findOneAndUpdate(
          { groupId, userId },
          { $inc: { balance: shareAmount } },
          { session, new: true }
        );
        
        // Update payer's balance (they are owed money)
        await GroupMember.findOneAndUpdate(
          { groupId, userId: paidById },
          { $inc: { balance: -shareAmount } },
          { session, new: true }
        );
      }
      
      // Log activity
      await Activity.create([{
        groupId,
        userId: paidById,
        type: 'expense_added',
        description: `Added expense "${name}" for ₹${amount}`,
        metadata: { expenseId: expense._id }
      }], { session });
      
      await session.commitTransaction();
      
      // Populate and return the expense
      const populatedExpense = await Expense.findById(expense._id)
        .populate('groupId')
        .populate('paidById', 'email displayName')
        .select('-__v');
      
      return populatedExpense;
    } catch (error) {
      await session.abortTransaction();
      console.error('Error creating expense:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }
  
  // Get expense by ID
  static async getExpenseById(expenseId: string) {
    try {
      if (!Types.ObjectId.isValid(expenseId)) {
        throw new Error('Invalid expense ID');
      }
      
      const expense = await Expense.findById(expenseId)
        .populate('groupId')
        .populate('paidById', 'email displayName')
        .select('-__v');
      
      if (!expense) {
        throw new Error('Expense not found');
      }
      
      return expense;
    } catch (error) {
      console.error('Error fetching expense:', error);
      throw error;
    }
  }
  
  // Get expense participants
  static async getExpenseParticipants(expenseId: string) {
    try {
      if (!Types.ObjectId.isValid(expenseId)) {
        throw new Error('Invalid expense ID');
      }
      
      const participants = await ExpenseParticipant.find({ expenseId })
        .populate('userId', 'email displayName avatarUrl')
        .select('-__v');
      
      return participants;
    } catch (error) {
      console.error('Error fetching expense participants:', error);
      throw error;
    }
  }
  
  // Update expense
  static async updateExpense(expenseId: string, updateData: Partial<IExpense>) {
    const session = await Expense.startSession();
    session.startTransaction();
    
    try {
      if (!Types.ObjectId.isValid(expenseId)) {
        throw new Error('Invalid expense ID');
      }
      
      const expense = await Expense.findByIdAndUpdate(
        expenseId,
        updateData,
        { new: true, session }
      ).select('-__v');
      
      if (!expense) {
        throw new Error('Expense not found');
      }
      
      // Log activity
      await Activity.create([{
        groupId: expense.groupId,
        userId: expense.paidById.toString(),
        type: 'expense_updated',
        description: `Updated expense "${expense.name}"`,
        metadata: { expenseId: expense._id }
      }], { session });
      
      await session.commitTransaction();
      
      return expense;
    } catch (error) {
      await session.abortTransaction();
      console.error('Error updating expense:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }
  
  // Delete expense
  static async deleteExpense(expenseId: string) {
    const session = await Expense.startSession();
    session.startTransaction();
    
    try {
      if (!Types.ObjectId.isValid(expenseId)) {
        throw new Error('Invalid expense ID');
      }
      
      const expense = await Expense.findById(expenseId);
      if (!expense) {
        throw new Error('Expense not found');
      }
      
      // Delete expense participants
      await ExpenseParticipant.deleteMany({ expenseId }, { session });
      
      // Delete expense
      await Expense.findByIdAndDelete(expenseId, { session });
      
      // Log activity
      await Activity.create([{
        groupId: expense.groupId,
        userId: expense.paidById.toString(),
        type: 'expense_deleted',
        description: `Deleted expense "${expense.name}"`,
        metadata: { expenseId: expense._id }
      }], { session });
      
      await session.commitTransaction();
      
      return { message: 'Expense deleted successfully' };
    } catch (error) {
      await session.abortTransaction();
      console.error('Error deleting expense:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }
  
  // Get group expenses
  static async getGroupExpenses(groupId: string, limit: number = 50) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const expenses = await Expense.find({ groupId })
        .populate('paidById', 'email displayName')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return expenses;
    } catch (error) {
      console.error('Error fetching group expenses:', error);
      throw error;
    }
  }
  
  // Get user expenses
  static async getUserExpenses(userId: string, limit: number = 50) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      const expenses = await Expense.find({ paidById: userId })
        .populate('groupId')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return expenses;
    } catch (error) {
      console.error('Error fetching user expenses:', error);
      throw error;
    }
  }
  
  // Calculate user's balance in a group
  static async calculateUserBalance(groupId: string, userId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId) || !Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid group or user ID');
      }
      
      // Get user's group member record
      const groupMember = await GroupMember.findOne({ groupId, userId });
      if (!groupMember) {
        throw new Error('User is not a member of this group');
      }
      
      return {
        balance: groupMember.balance,
        message: groupMember.balance > 0 
          ? `You owe ₹${Math.abs(groupMember.balance)}`
          : groupMember.balance < 0 
          ? `You are owed ₹${Math.abs(groupMember.balance)}`
          : 'You are settled up'
      };
    } catch (error) {
      console.error('Error calculating user balance:', error);
      throw error;
    }
  }
  
  // Settle expense participant
  static async settleParticipant(expenseId: string, userId: string) {
    try {
      if (!Types.ObjectId.isValid(expenseId) || !Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid expense or user ID');
      }
      
      const participant = await ExpenseParticipant.findOneAndUpdate(
        { expenseId, userId },
        { isPaid: true },
        { new: true }
      ).select('-__v');
      
      if (!participant) {
        throw new Error('Participant not found');
      }
      
      return participant;
    } catch (error) {
      console.error('Error settling participant:', error);
      throw error;
    }
  }
}

export default ExpenseController;