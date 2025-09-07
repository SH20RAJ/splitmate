import Budget, { IBudget } from '../models/Budget';
import Category from '../models/Category';
import Expense from '../models/Expense';
import { Types } from 'mongoose';

export class BudgetController {
  // Create a new budget
  static async createBudget(budgetData: {
    groupId: string;
    categoryId?: string;
    name: string;
    amount: number;
    period: 'weekly' | 'monthly' | 'yearly';
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
  }) {
    try {
      // Validate category if provided
      if (budgetData.categoryId) {
        const categoryExists = await Category.findById(budgetData.categoryId);
        if (!categoryExists) {
          throw new Error('Category not found');
        }
      }
      
      const budget = new Budget(budgetData);
      await budget.save();
      
      // Populate and return the budget
      const populatedBudget = await Budget.findById(budget._id)
        .populate('groupId')
        .populate('categoryId')
        .select('-__v');
      
      return populatedBudget;
    } catch (error) {
      console.error('Error creating budget:', error);
      throw error;
    }
  }
  
  // Get budget by ID
  static async getBudgetById(budgetId: string) {
    try {
      if (!Types.ObjectId.isValid(budgetId)) {
        throw new Error('Invalid budget ID');
      }
      
      const budget = await Budget.findById(budgetId)
        .populate('groupId')
        .populate('categoryId')
        .select('-__v');
      
      if (!budget) {
        throw new Error('Budget not found');
      }
      
      return budget;
    } catch (error) {
      console.error('Error fetching budget:', error);
      throw error;
    }
  }
  
  // Get group budgets
  static async getGroupBudgets(groupId: string, isActive: boolean = true) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      const budgets = await Budget.find({ groupId, isActive })
        .populate('categoryId')
        .sort({ startDate: -1 })
        .select('-__v');
      
      return budgets;
    } catch (error) {
      console.error('Error fetching group budgets:', error);
      throw error;
    }
  }
  
  // Update budget
  static async updateBudget(budgetId: string, updateData: Partial<IBudget>) {
    try {
      if (!Types.ObjectId.isValid(budgetId)) {
        throw new Error('Invalid budget ID');
      }
      
      // Validate category if provided
      if (updateData.categoryId) {
        const categoryExists = await Category.findById(updateData.categoryId);
        if (!categoryExists) {
          throw new Error('Category not found');
        }
      }
      
      const budget = await Budget.findByIdAndUpdate(
        budgetId,
        updateData,
        { new: true }
      )
        .populate('groupId')
        .populate('categoryId')
        .select('-__v');
      
      if (!budget) {
        throw new Error('Budget not found');
      }
      
      return budget;
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  }
  
  // Delete budget
  static async deleteBudget(budgetId: string) {
    try {
      if (!Types.ObjectId.isValid(budgetId)) {
        throw new Error('Invalid budget ID');
      }
      
      const result = await Budget.findByIdAndDelete(budgetId);
      
      if (!result) {
        throw new Error('Budget not found');
      }
      
      return { message: 'Budget deleted successfully' };
    } catch (error) {
      console.error('Error deleting budget:', error);
      throw error;
    }
  }
  
  // Get budget statistics
  static async getBudgetStats(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      // Get active budgets
      const activeBudgets = await Budget.find({ groupId, isActive: true })
        .populate('categoryId')
        .select('-__v');
      
      // Calculate budget utilization
      const budgetStats = [];
      
      for (const budget of activeBudgets) {
        // Calculate expenses in this budget period and category
        const expenseQuery: any = {
          groupId,
          expenseDate: {
            $gte: budget.startDate
          }
        };
        
        if (budget.endDate) {
          expenseQuery.expenseDate.$lte = budget.endDate;
        }
        
        if (budget.categoryId) {
          expenseQuery.categoryId = budget.categoryId;
        }
        
        const expenses = await Expense.find(expenseQuery);
        const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        const utilization = budget.amount > 0 ? (totalSpent / budget.amount) * 100 : 0;
        
        budgetStats.push({
          budget: budget.toJSON(),
          totalSpent,
          remaining: Math.max(0, budget.amount - totalSpent),
          utilization: Math.min(100, utilization),
          status: utilization >= 100 ? 'exceeded' : utilization >= 80 ? 'warning' : 'good'
        });
      }
      
      return budgetStats;
    } catch (error) {
      console.error('Error fetching budget stats:', error);
      throw error;
    }
  }
  
  // Get budget utilization for a specific period
  static async getBudgetUtilization(groupId: string, startDate: Date, endDate: Date, categoryId?: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      // Get budgets for the period
      const budgetQuery: any = {
        groupId,
        startDate: { $lte: endDate },
        $or: [
          { endDate: null },
          { endDate: { $gte: startDate } }
        ]
      };
      
      if (categoryId) {
        budgetQuery.categoryId = categoryId;
      }
      
      const budgets = await Budget.find(budgetQuery)
        .populate('categoryId')
        .select('-__v');
      
      // Calculate expenses for the period
      const expenseQuery: any = {
        groupId,
        expenseDate: {
          $gte: startDate,
          $lte: endDate
        }
      };
      
      if (categoryId) {
        expenseQuery.categoryId = categoryId;
      }
      
      const expenses = await Expense.find(expenseQuery);
      const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      // Calculate total budgeted amount for the period
      let totalBudgeted = 0;
      for (const budget of budgets) {
        totalBudgeted += budget.amount;
      }
      
      const utilization = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;
      
      return {
        totalBudgeted,
        totalSpent,
        remaining: Math.max(0, totalBudgeted - totalSpent),
        utilization: Math.min(100, utilization),
        status: utilization >= 100 ? 'exceeded' : utilization >= 80 ? 'warning' : 'good',
        budgets: budgets.map(budget => budget.toJSON()),
        period: {
          startDate,
          endDate
        }
      };
    } catch (error) {
      console.error('Error calculating budget utilization:', error);
      throw error;
    }
  }
  
  // Deactivate expired budgets
  static async deactivateExpiredBudgets() {
    try {
      const now = new Date();
      
      const result = await Budget.updateMany(
        {
          isActive: true,
          endDate: { $lt: now }
        },
        { isActive: false }
      );
      
      return {
        message: `Deactivated ${result.modifiedCount} expired budgets`,
        deactivatedCount: result.modifiedCount
      };
    } catch (error) {
      console.error('Error deactivating expired budgets:', error);
      throw error;
    }
  }
  
  // Get upcoming budget alerts
  static async getBudgetAlerts(groupId: string) {
    try {
      if (!Types.ObjectId.isValid(groupId)) {
        throw new Error('Invalid group ID');
      }
      
      // Get active budgets
      const activeBudgets = await Budget.find({ groupId, isActive: true })
        .populate('categoryId')
        .select('-__v');
      
      const alerts = [];
      
      for (const budget of activeBudgets) {
        // Calculate expenses in this budget period and category
        const expenseQuery: any = {
          groupId,
          expenseDate: {
            $gte: budget.startDate
          }
        };
        
        if (budget.endDate) {
          expenseQuery.expenseDate.$lte = budget.endDate;
        }
        
        if (budget.categoryId) {
          expenseQuery.categoryId = budget.categoryId;
        }
        
        const expenses = await Expense.find(expenseQuery);
        const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        const utilization = budget.amount > 0 ? (totalSpent / budget.amount) * 100 : 0;
        
        // Create alerts for high utilization
        if (utilization >= 80) {
          alerts.push({
            budget: budget.toJSON(),
            totalSpent,
            remaining: Math.max(0, budget.amount - totalSpent),
            utilization: Math.min(100, utilization),
            alertLevel: utilization >= 100 ? 'critical' : 'warning',
            message: utilization >= 100 
              ? `Budget exceeded! You've spent ₹${totalSpent} of ₹${budget.amount}`
              : `Budget warning! You've spent ₹${totalSpent} of ₹${budget.amount} (${utilization.toFixed(1)}%)`
          });
        }
      }
      
      return alerts;
    } catch (error) {
      console.error('Error fetching budget alerts:', error);
      throw error;
    }
  }
}

export default BudgetController;