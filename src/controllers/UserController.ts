import User from '../models/User';
import GroupMember from '../models/GroupMember';
import Expense from '../models/Expense';
import Payment from '../models/Payment';
import { Types } from 'mongoose';
import { NextRequest } from 'next/server';

export class UserController {
  // Get user by email
  static async getUserByEmail(email: string) {
    try {
      if (!email) {
        throw new Error('Email is required');
      }
      
      const user = await User.findOne({ email }).select('-__v');
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
  
  // Create or update user
  static async upsertUser(userData: { email: string; displayName?: string; avatarUrl?: string }) {
    try {
      const { email, displayName, avatarUrl } = userData;
      
      if (!email) {
        throw new Error('Email is required');
      }
      
      const user = await User.findOneAndUpdate(
        { email },
        { email, displayName, avatarUrl },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).select('-__v');
      
      return user;
    } catch (error) {
      console.error('Error upserting user:', error);
      throw error;
    }
  }
  
  // Get user's groups
  static async getUserGroups(userId: string) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      const groupMemberships = await GroupMember.find({ userId })
        .populate('groupId')
        .select('-__v');
      
      return groupMemberships;
    } catch (error) {
      console.error('Error fetching user groups:', error);
      throw error;
    }
  }
  
  // Get user's expenses
  static async getUserExpenses(userId: string) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      const expenses = await Expense.find({ paidById: userId })
        .populate('groupId')
        .sort({ createdAt: -1 })
        .select('-__v');
      
      return expenses;
    } catch (error) {
      console.error('Error fetching user expenses:', error);
      throw error;
    }
  }
  
  // Get user's payments
  static async getUserPayments(userId: string) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      const payments = await Payment.find({
        $or: [{ fromUserId: userId }, { toUserId: userId }]
      })
        .populate('groupId')
        .populate('fromUserId')
        .populate('toUserId')
        .sort({ createdAt: -1 })
        .select('-__v');
      
      return payments;
    } catch (error) {
      console.error('Error fetching user payments:', error);
      throw error;
    }
  }
  
  // Delete user
  static async deleteUser(userId: string) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      // Delete user's group memberships
      await GroupMember.deleteMany({ userId });
      
      // Delete user's expenses
      await Expense.deleteMany({ paidById: userId });
      
      // Delete user's payments
      await Payment.deleteMany({
        $or: [{ fromUserId: userId }, { toUserId: userId }]
      });
      
      // Delete user
      const result = await User.findByIdAndDelete(userId);
      
      if (!result) {
        throw new Error('User not found');
      }
      
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export default UserController;