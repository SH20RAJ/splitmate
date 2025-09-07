import Payment, { IPayment } from '../models/Payment';
import GroupMember from '../models/GroupMember';
import Activity from '../models/Activity';
import { Types } from 'mongoose';

export class PaymentController {
  // Create a new payment
  static async createPayment(paymentData: {
    groupId: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
    currency: string;
    description?: string;
    method: 'cash' | 'upi' | 'bank_transfer' | 'card' | 'other';
    transactionId?: string;
    paymentDate: Date;
  }) {
    const session = await Payment.startSession();
    session.startTransaction();
    
    try {
      const {
        groupId,
        fromUserId,
        toUserId,
        amount,
        currency,
        description,
        method,
        transactionId,
        paymentDate
      } = paymentData;
      
      // Validate group membership
      const isFromMember = await GroupMember.exists({ groupId, userId: fromUserId });
      const isToMember = await GroupMember.exists({ groupId, userId: toUserId });
      
      if (!isFromMember || !isToMember) {
        throw new Error('Both users must be members of this group');
      }
      
      // Create payment
      const payment = new Payment({
        groupId,
        fromUserId,
        toUserId,
        amount,
        currency,
        description,
        method,
        transactionId,
        paymentDate,
        status: 'pending'
      });
      
      await payment.save({ session });
      
      // Update group member balances
      // Reduce the amount owed by fromUser
      await GroupMember.findOneAndUpdate(
        { groupId, userId: fromUserId },
        { $inc: { balance: -amount } },
        { session, new: true }
      );
      
      // Increase the amount owed to toUser
      await GroupMember.findOneAndUpdate(
        { groupId, userId: toUserId },
        { $inc: { balance: amount } },
        { session, new: true }
      );
      
      // Log activity
      await Activity.create([{
        groupId,
        userId: fromUserId,
        type: 'payment_made',
        description: `Made payment of ₹${amount} to ${toUserId === fromUserId ? 'self' : 'another member'}`,
        metadata: { paymentId: payment._id }
      }], { session });
      
      await session.commitTransaction();
      
      // Populate and return the payment
      const populatedPayment = await Payment.findById(payment._id)
        .populate('groupId')
        .populate('fromUserId', 'email displayName')
        .populate('toUserId', 'email displayName')
        .select('-__v');
      
      return populatedPayment;
    } catch (error) {
      await session.abortTransaction();
      console.error('Error creating payment:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }
  
  // Get payment by ID
  static async getPaymentById(paymentId: string) {
    try {
      if (!Types.ObjectId.isValid(paymentId)) {
        throw new Error('Invalid payment ID');
      }
      
      const payment = await Payment.findById(paymentId)
        .populate('groupId')
        .populate('fromUserId', 'email displayName')
        .populate('toUserId', 'email displayName')
        .select('-__v');
      
      if (!payment) {
        throw new Error('Payment not found');
      }
      
      return payment;
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  }
  
  // Update payment
  static async updatePayment(paymentId: string, updateData: Partial<IPayment>) {
    const session = await Payment.startSession();
    session.startTransaction();
    
    try {
      if (!Types.ObjectId.isValid(paymentId)) {
        throw new Error('Invalid payment ID');
      }
      
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        updateData,
        { new: true, session }
      ).select('-__v');
      
      if (!payment) {
        throw new Error('Payment not found');
      }
      
      // Log activity
      await Activity.create([{
        groupId: payment.groupId,
        userId: payment.fromUserId.toString(),
        type: 'payment_updated',
        description: `Updated payment of ₹${payment.amount}`,
        metadata: { paymentId: payment._id }
      }], { session });
      
      await session.commitTransaction();
      
      return payment;
    } catch (error) {
      await session.abortTransaction();
      console.error('Error updating payment:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }
  
  // Delete payment
  static async deletePayment(paymentId: string) {
    const session = await Payment.startSession();
    session.startTransaction();
    
    try {
      if (!Types.ObjectId.isValid(paymentId)) {
        throw new Error('Invalid payment ID');
      }
      
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        throw new Error('Payment not found');
      }
      
      // Reverse balance changes
      // Increase the amount owed by fromUser
      await GroupMember.findOneAndUpdate(
        { groupId: payment.groupId, userId: payment.fromUserId },
        { $inc: { balance: payment.amount } },
        { session, new: true }
      );
      
      // Decrease the amount owed to toUser
      await GroupMember.findOneAndUpdate(
        { groupId: payment.groupId, userId: payment.toUserId },
        { $inc: { balance: -payment.amount } },
        { session, new: true }
      );
      
      // Delete payment
      await Payment.findByIdAndDelete(paymentId, { session });
      
      // Log activity
      await Activity.create([{
        groupId: payment.groupId,
        userId: payment.fromUserId.toString(),
        type: 'payment_deleted',
        description: `Deleted payment of ₹${payment.amount}`,
        metadata: { paymentId: payment._id }
      }], { session });
      
      await session.commitTransaction();
      
      return { message: 'Payment deleted successfully' };
    } catch (error) {
      await session.abortTransaction();
      console.error('Error deleting payment:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }
  
  // Get group payments
  static async getGroupPayments(groupId: string, limit: number = 50) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const payments = await Payment.find({ groupId })
        .populate('fromUserId', 'email displayName')
        .populate('toUserId', 'email displayName')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return payments;
    } catch (error) {
      console.error('Error fetching group payments:', error);
      throw error;
    }
  }
  
  // Get user payments (sent or received)
  static async getUserPayments(userId: string, limit: number = 50) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      const payments = await Payment.find({
        $or: [{ fromUserId: userId }, { toUserId: userId }]
      })
        .populate('groupId')
        .populate('fromUserId', 'email displayName')
        .populate('toUserId', 'email displayName')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return payments;
    } catch (error) {
      console.error('Error fetching user payments:', error);
      throw error;
    }
  }
  
  // Get payments between two users in a group
  static async getPaymentsBetweenUsers(groupId: string, userId1: string, userId2: string) {
    try {
      if (!Types.ObjectId.isValid(groupId) || 
          !Types.ObjectId.isValid(userId1) || 
          !Types.ObjectId.isValid(userId2)) {
        throw new Error('Invalid group or user IDs');
      }
      
      const payments = await Payment.find({
        groupId,
        $or: [
          { fromUserId: userId1, toUserId: userId2 },
          { fromUserId: userId2, toUserId: userId1 }
        ]
      })
        .sort({ createdAt: -1 })
        .select('-__v');
      
      return payments;
    } catch (error) {
      console.error('Error fetching payments between users:', error);
      throw error;
    }
  }
  
  // Mark payment as completed
  static async markPaymentCompleted(paymentId: string) {
    try {
      if (!Types.ObjectId.isValid(paymentId)) {
        throw new Error('Invalid payment ID');
      }
      
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        { status: 'completed' },
        { new: true }
      ).select('-__v');
      
      if (!payment) {
        throw new Error('Payment not found');
      }
      
      return payment;
    } catch (error) {
      console.error('Error marking payment as completed:', error);
      throw error;
    }
  }
  
  // Mark payment as failed
  static async markPaymentFailed(paymentId: string) {
    const session = await Payment.startSession();
    session.startTransaction();
    
    try {
      if (!Types.ObjectId.isValid(paymentId)) {
        throw new Error('Invalid payment ID');
      }
      
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        throw new Error('Payment not found');
      }
      
      // Reverse balance changes
      await GroupMember.findOneAndUpdate(
        { groupId: payment.groupId, userId: payment.fromUserId },
        { $inc: { balance: payment.amount } },
        { session, new: true }
      );
      
      await GroupMember.findOneAndUpdate(
        { groupId: payment.groupId, userId: payment.toUserId },
        { $inc: { balance: -payment.amount } },
        { session, new: true }
      );
      
      // Update payment status
      const updatedPayment = await Payment.findByIdAndUpdate(
        paymentId,
        { status: 'failed' },
        { new: true, session }
      ).select('-__v');
      
      await session.commitTransaction();
      
      return updatedPayment;
    } catch (error) {
      await session.abortTransaction();
      console.error('Error marking payment as failed:', error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Generate settlement suggestions to minimize the number of transactions
  static async generateSettlementSuggestions(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }

      // Get all group members with their balances
      const members = await GroupMember.find({ groupId })
        .populate('userId', 'email displayName')
        .select('userId balance -_id');

      if (members.length === 0) {
        return [];
      }

      // Separate creditors (negative balance - they are owed money) and debtors (positive balance - they owe money)
      const creditors = members.filter(member => member.balance < 0).map(member => ({
        ...member.toObject(),
        balance: Math.abs(member.balance) // Make positive for easier calculation
      }));

      const debtors = members.filter(member => member.balance > 0).map(member => ({
        ...member.toObject(),
        balance: member.balance
      }));

      const suggestions = [];

      // Create a copy for manipulation
      const creditorsQueue = [...creditors];
      const debtorsQueue = [...debtors];

      while (creditorsQueue.length > 0 && debtorsQueue.length > 0) {
        const creditor = creditorsQueue[0];
        const debtor = debtorsQueue[0];

        const settleAmount = Math.min(creditor.balance, debtor.balance);

        suggestions.push({
          fromUser: debtor.userId,
          toUser: creditor.userId,
          amount: settleAmount,
          currency: 'INR' // Default currency, could be made dynamic
        });

        // Update balances
        creditor.balance -= settleAmount;
        debtor.balance -= settleAmount;

        // Remove if balance is zero
        if (creditor.balance === 0) {
          creditorsQueue.shift();
        }
        if (debtor.balance === 0) {
          debtorsQueue.shift();
        }
      }

      return suggestions;
    } catch (error) {
      console.error('Error generating settlement suggestions:', error);
      throw error;
    }
  }
}

export default PaymentController;