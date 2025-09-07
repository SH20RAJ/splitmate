import Group, { IGroup } from '../models/Group';
import GroupMember from '../models/GroupMember';
import Expense from '../models/Expense';
import ExpenseParticipant from '../models/ExpenseParticipant';
import Payment from '../models/Payment';
import Activity from '../models/Activity';
import Budget from '../models/Budget';
import { Types } from 'mongoose';

export class GroupController {
  // Create a new group
  static async createGroup(groupData: {
    name: string;
    description?: string;
    currency: string;
    category: string;
    monthlyBudget?: number;
    createdBy: string;
  }) {
    try {
      const group = new Group(groupData);
      await group.save();
      
      // Add creator as admin member
      await GroupMember.create({
        groupId: group._id,
        userId: group.createdBy,
        role: 'admin',
        balance: 0,
      });
      
      // Log activity
      await Activity.create({
        groupId: group._id,
        userId: group.createdBy,
        type: 'group_created',
        description: `Created group "${group.name}"`,
      });
      
      return group;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  }
  
  // Get group by ID
  static async getGroupById(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const group = await Group.findById(groupId).select('-__v');
      
      if (!group) {
        throw new Error('Group not found');
      }
      
      return group;
    } catch (error) {
      console.error('Error fetching group:', error);
      throw error;
    }
  }
  
  // Get group members
  static async getGroupMembers(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const members = await GroupMember.find({ groupId })
        .populate('userId', 'email displayName avatarUrl')
        .select('-__v');
      
      return members;
    } catch (error) {
      console.error('Error fetching group members:', error);
      throw error;
    }
  }
  
  // Add member to group
  static async addMember(groupId: string, userId: string, role: 'admin' | 'member' = 'member') {
    try {
      if (!Types.ObjectId.isValid(groupId) || !Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid group or user ID');
      }
      
      // Check if member already exists
      const existingMember = await GroupMember.findOne({ groupId, userId });
      if (existingMember) {
        throw new Error('User is already a member of this group');
      }
      
      const member = await GroupMember.create({
        groupId,
        userId,
        role,
        balance: 0,
      });
      
      // Log activity
      await Activity.create({
        groupId,
        userId,
        type: 'member_added',
        description: `Added member to group`,
      });
      
      return member;
    } catch (error) {
      console.error('Error adding member to group:', error);
      throw error;
    }
  }
  
  // Remove member from group
  static async removeMember(groupId: string, userId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId) || !Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid group or user ID');
      }
      
      // Check if member exists
      const member = await GroupMember.findOne({ groupId, userId });
      if (!member) {
        throw new Error('User is not a member of this group');
      }
      
      // Prevent removing the last admin
      if (member.role === 'admin') {
        const adminCount = await GroupMember.countDocuments({ groupId, role: 'admin' });
        if (adminCount <= 1) {
          throw new Error('Cannot remove the last admin from the group');
        }
      }
      
      await GroupMember.deleteOne({ groupId, userId });
      
      // Log activity
      await Activity.create({
        groupId,
        userId,
        type: 'member_removed',
        description: `Removed member from group`,
      });
      
      return { message: 'Member removed successfully' };
    } catch (error) {
      console.error('Error removing member from group:', error);
      throw error;
    }
  }
  
  // Get group expenses
  static async getGroupExpenses(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const expenses = await Expense.find({ groupId })
        .populate('paidById', 'email displayName')
        .sort({ createdAt: -1 })
        .select('-__v');
      
      return expenses;
    } catch (error) {
      console.error('Error fetching group expenses:', error);
      throw error;
    }
  }
  
  // Get group payments
  static async getGroupPayments(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const payments = await Payment.find({ groupId })
        .populate('fromUserId', 'email displayName')
        .populate('toUserId', 'email displayName')
        .sort({ createdAt: -1 })
        .select('-__v');
      
      return payments;
    } catch (error) {
      console.error('Error fetching group payments:', error);
      throw error;
    }
  }
  
  // Get group activities
  static async getGroupActivities(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const activities = await Activity.find({ groupId })
        .populate('userId', 'email displayName')
        .sort({ createdAt: -1 })
        .limit(50)
        .select('-__v');
      
      return activities;
    } catch (error) {
      console.error('Error fetching group activities:', error);
      throw error;
    }
  }
  
  // Get group budgets
  static async getGroupBudgets(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const budgets = await Budget.find({ groupId, isActive: true })
        .populate('categoryId')
        .sort({ startDate: -1 })
        .select('-__v');
      
      return budgets;
    } catch (error) {
      console.error('Error fetching group budgets:', error);
      throw error;
    }
  }
  
  // Update group
  static async updateGroup(groupId: string, updateData: Partial<IGroup>) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const group = await Group.findByIdAndUpdate(
        groupId,
        updateData,
        { new: true }
      ).select('-__v');
      
      if (!group) {
        throw new Error('Group not found');
      }
      
      // Log activity
      await Activity.create({
        groupId,
        userId: group.createdBy.toString(), // Assuming this is available
        type: 'group_updated',
        description: `Updated group "${group.name}"`,
      });
      
      return group;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  }
  
  // Delete group
  static async deleteGroup(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      // Delete related data
      await GroupMember.deleteMany({ groupId });
      await Expense.deleteMany({ groupId });
      await ExpenseParticipant.deleteMany({ expenseId: { $in: await Expense.find({ groupId }).distinct('_id') } });
      await Payment.deleteMany({ groupId });
      await Activity.deleteMany({ groupId });
      await Budget.deleteMany({ groupId });
      
      // Delete group
      const result = await Group.findByIdAndDelete(groupId);
      
      if (!result) {
        throw new Error('Group not found');
      }
      
      return { message: 'Group deleted successfully' };
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  }
}

export default GroupController;