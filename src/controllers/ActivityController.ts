import Activity, { IActivity } from '../models/Activity';
import { Types } from 'mongoose';

export class ActivityController {
  // Create a new activity
  static async createActivity(activityData: {
    groupId: string;
    userId: string;
    type: 'expense_added' | 'expense_updated' | 'expense_deleted' | 'payment_made' | 'member_added' | 'member_removed' | 'group_created' | 'group_updated' | 'group_settled';
    description: string;
    metadata?: Record<string, any>;
  }) {
    try {
      const activity = new Activity(activityData);
      await activity.save();
      
      // Populate and return the activity
      const populatedActivity = await Activity.findById(activity._id)
        .populate('groupId')
        .populate('userId', 'email displayName')
        .select('-__v');
      
      return populatedActivity;
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }
  
  // Get activity by ID
  static async getActivityById(activityId: string) {
    try {
      if (!Types.ObjectId.isValid(activityId)) {
        throw new Error('Invalid activity ID');
      }
      
      const activity = await Activity.findById(activityId)
        .populate('groupId')
        .populate('userId', 'email displayName')
        .select('-__v');
      
      if (!activity) {
        throw new Error('Activity not found');
      }
      
      return activity;
    } catch (error) {
      console.error('Error fetching activity:', error);
      throw error;
    }
  }
  
  // Get group activities
  static async getGroupActivities(groupId: string, limit: number = 50) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const activities = await Activity.find({ groupId })
        .populate('userId', 'email displayName')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return activities;
    } catch (error) {
      console.error('Error fetching group activities:', error);
      throw error;
    }
  }
  
  // Get user activities
  static async getUserActivities(userId: string, limit: number = 50) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      const activities = await Activity.find({ userId })
        .populate('groupId')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return activities;
    } catch (error) {
      console.error('Error fetching user activities:', error);
      throw error;
    }
  }
  
  // Get activities by type
  static async getActivitiesByType(
    groupId: string,
    type: 'expense_added' | 'expense_updated' | 'expense_deleted' | 'payment_made' | 'member_added' | 'member_removed' | 'group_created' | 'group_updated' | 'group_settled',
    limit: number = 50
  ) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const activities = await Activity.find({ groupId, type })
        .populate('userId', 'email displayName')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return activities;
    } catch (error) {
      console.error('Error fetching activities by type:', error);
      throw error;
    }
  }
  
  // Get recent activities across all groups for a user
  static async getRecentUserActivities(userId: string, limit: number = 20) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      const activities = await Activity.find({ userId })
        .populate('groupId')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return activities;
    } catch (error) {
      console.error('Error fetching recent user activities:', error);
      throw error;
    }
  }
  
  // Delete activity
  static async deleteActivity(activityId: string) {
    try {
      if (!Types.ObjectId.isValid(activityId)) {
        throw new Error('Invalid activity ID');
      }
      
      const result = await Activity.findByIdAndDelete(activityId);
      
      if (!result) {
        throw new Error('Activity not found');
      }
      
      return { message: 'Activity deleted successfully' };
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  }
  
  // Get activity feed for dashboard
  static async getActivityFeed(userId: string, limit: number = 30) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      // Get group IDs where user is a member
      // Note: This would require importing GroupMember model
      // For now, we'll just get activities directly related to the user
      const activities = await Activity.find({ userId })
        .populate('groupId')
        .populate('userId', 'email displayName')
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-__v');
      
      return activities;
    } catch (error) {
      console.error('Error fetching activity feed:', error);
      throw error;
    }
  }
  
  // Get activity statistics
  static async getActivityStats(groupId: string, days: number = 30) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const stats = await Activity.aggregate([
        {
          $match: {
            groupId: new Types.ObjectId(groupId),
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: {
              type: '$type',
              date: {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: '$createdAt'
                }
              }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            '_id.date': 1
          }
        }
      ]);
      
      return stats;
    } catch (error) {
      console.error('Error fetching activity stats:', error);
      throw error;
    }
  }
}

export default ActivityController;