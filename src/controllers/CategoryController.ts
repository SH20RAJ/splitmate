import Category, { ICategory } from '../models/Category';
import { Types } from 'mongoose';

export class CategoryController {
  // Create a new category
  static async createCategory(categoryData: {
    name: string;
    icon?: string;
    color: string;
    description?: string;
    keywords?: string[];
    parentCategory?: string;
    isDefault: boolean;
  }) {
    try {
      const category = new Category(categoryData);
      await category.save();
      
      return category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }
  
  // Get category by ID
  static async getCategoryById(categoryId: string) {
    try {
      if (!Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category ID');
      }
      
      const category = await Category.findById(categoryId).select('-__v');
      
      if (!category) {
        throw new Error('Category not found');
      }
      
      return category;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }
  
  // Get all categories
  static async getAllCategories() {
    try {
      const categories = await Category.find().select('-__v');
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
  
  // Get default categories
  static async getDefaultCategories() {
    try {
      const categories = await Category.find({ isDefault: true }).select('-__v');
      return categories;
    } catch (error) {
      console.error('Error fetching default categories:', error);
      throw error;
    }
  }
  
  // Update category
  static async updateCategory(categoryId: string, updateData: Partial<ICategory>) {
    try {
      if (!Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category ID');
      }
      
      const category = await Category.findByIdAndUpdate(
        categoryId,
        updateData,
        { new: true }
      ).select('-__v');
      
      if (!category) {
        throw new Error('Category not found');
      }
      
      return category;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }
  
  // Delete category
  static async deleteCategory(categoryId: string) {
    try {
      if (!Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category ID');
      }
      
      const result = await Category.findByIdAndDelete(categoryId);
      
      if (!result) {
        throw new Error('Category not found');
      }
      
      return { message: 'Category deleted successfully' };
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
  
  // Get category statistics
  static async getCategoryStats() {
    try {
      // This would typically involve joining with Expense data
      // For now, we'll just return basic category info
      const categories = await Category.find().select('-__v');
      
      return {
        totalCategories: categories.length,
        defaultCategories: categories.filter(cat => cat.isDefault).length,
        categories
      };
    } catch (error) {
      console.error('Error fetching category stats:', error);
      throw error;
    }
  }
  
  // Seed default categories
  static async seedDefaultCategories() {
    try {
      const defaultCategories = [
        { name: 'Food & Dining', icon: '🍽️', color: '#FF6B6B', isDefault: true },
        { name: 'Transportation', icon: '🚗', color: '#4ECDC4', isDefault: true },
        { name: 'Shopping', icon: '🛍️', color: '#45B7D1', isDefault: true },
        { name: 'Entertainment', icon: '🎮', color: '#96CEB4', isDefault: true },
        { name: 'Utilities', icon: '💡', color: '#FFEAA7', isDefault: true },
        { name: 'Healthcare', icon: '🏥', color: '#DDA0DD', isDefault: true },
        { name: 'Travel', icon: '✈️', color: '#98D8C8', isDefault: true },
        { name: 'Education', icon: '📚', color: '#F7DC6F', isDefault: true },
        { name: 'Gifts & Donations', icon: '🎁', color: '#BB8FCE', isDefault: true },
        { name: 'Personal Care', icon: '💅', color: '#F8C471', isDefault: true },
        { name: 'Investments', icon: '📈', color: '#82E0AA', isDefault: true },
        { name: 'Other', icon: '📦', color: '#D5D8DC', isDefault: true }
      ];
      
      // Check if categories already exist
      const existingCategories = await Category.find({ isDefault: true });
      
      if (existingCategories.length === 0) {
        await Category.insertMany(defaultCategories);
        return { message: 'Default categories seeded successfully' };
      }
      
      return { message: 'Default categories already exist' };
    } catch (error) {
      console.error('Error seeding default categories:', error);
      throw error;
    }
  }

  // Get category by name
  static async getCategoryByName(name: string) {
    try {
      const category = await Category.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') } 
      }).select('-__v');
      
      return category;
    } catch (error) {
      console.error('Error fetching category by name:', error);
      throw error;
    }
  }

  // Get categories with usage statistics
  static async getCategoriesWithUsage(userId: string, timeframe: string = '30d') {
    try {
      // Import Expense model dynamically to avoid circular dependencies
      const { default: Expense } = await import('../models/Expense');
      
      // Calculate date range based on timeframe
      const now = new Date();
      const startDate = new Date();
      
      switch (timeframe) {
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(now.getDate() - 90);
          break;
        case '1y':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate.setDate(now.getDate() - 30);
      }

      // Get all categories
      const categories = await Category.find().select('-__v');
      
      // Get expense usage statistics
      const usageStats = await Expense.aggregate([
        {
          $match: {
            userId: new Types.ObjectId(userId),
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            totalAmount: { $sum: '$amount' },
            avgAmount: { $avg: '$amount' }
          }
        }
      ]);

      // Combine categories with usage stats
      const categoriesWithUsage = categories.map(category => {
        const usage = usageStats.find(stat => 
          stat._id && stat._id.toString() === category._id.toString()
        );
        
        return {
          ...category.toObject(),
          usage: {
            count: usage?.count || 0,
            totalAmount: usage?.totalAmount || 0,
            avgAmount: usage?.avgAmount || 0
          }
        };
      });

      // Sort by usage count (most used first)
      categoriesWithUsage.sort((a, b) => (b.usage.count || 0) - (a.usage.count || 0));
      
      return categoriesWithUsage;
    } catch (error) {
      console.error('Error fetching categories with usage:', error);
      throw error;
    }
  }

  // Delete multiple categories
  static async deleteCategories(categoryIds: string[]) {
    try {
      const validIds = categoryIds.filter(id => Types.ObjectId.isValid(id));
      
      if (validIds.length === 0) {
        throw new Error('No valid category IDs provided');
      }
      
      const result = await Category.deleteMany({
        _id: { $in: validIds },
        isDefault: false // Don't allow deletion of default categories
      });
      
      return result.deletedCount;
    } catch (error) {
      console.error('Error deleting categories:', error);
      throw error;
    }
  }

  // Check if categories are being used in expenses
  static async checkCategoriesInUse(categoryIds: string[]) {
    try {
      // Import Expense model dynamically to avoid circular dependencies
      const { default: Expense } = await import('../models/Expense');
      
      const validIds = categoryIds.filter(id => Types.ObjectId.isValid(id));
      
      const categoriesInUse = await Expense.aggregate([
        {
          $match: {
            category: { $in: validIds.map(id => new Types.ObjectId(id)) }
          }
        },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'categoryInfo'
          }
        },
        {
          $project: {
            categoryId: '$_id',
            name: { $arrayElemAt: ['$categoryInfo.name', 0] },
            expenseCount: '$count'
          }
        }
      ]);
      
      return categoriesInUse;
    } catch (error) {
      console.error('Error checking categories in use:', error);
      throw error;
    }
  }
}

export default CategoryController;