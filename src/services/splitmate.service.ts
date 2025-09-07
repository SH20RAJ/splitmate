import DatabaseService from './database.service';
import AuthService from './auth.service';
import AIService from './ai.service';
import { UserController } from '../controllers/UserController';
import { GroupController } from '../controllers/GroupController';
import { ExpenseController } from '../controllers/ExpenseController';
import { PaymentController } from '../controllers/PaymentController';
import { ActivityController } from '../controllers/ActivityController';
import { CategoryController } from '../controllers/CategoryController';
import { BudgetController } from '../controllers/BudgetController';

export class SplitMateService {
  private static instance: SplitMateService;
  private databaseService: typeof DatabaseService;
  private authService: typeof AuthService;
  private aiService: typeof AIService;

  private constructor() {
    this.databaseService = DatabaseService;
    this.authService = AuthService;
    this.aiService = AIService;
  }

  static getInstance(): SplitMateService {
    if (!SplitMateService.instance) {
      SplitMateService.instance = new SplitMateService();
    }
    return SplitMateService.instance;
  }

  // Initialize all services
  async initialize() {
    try {
      // Connect to database
      await this.databaseService.connect();
      
      // Initialize default data
      await this.databaseService.initializeDefaultData();
      
      console.log('SplitMate services initialized successfully');
    } catch (error) {
      console.error('Error initializing SplitMate services:', error);
      throw error;
    }
  }

  // Get all services
  get services() {
    return {
      database: this.databaseService,
      auth: this.authService,
      ai: this.aiService,
      users: UserController,
      groups: GroupController,
      expenses: ExpenseController,
      payments: PaymentController,
      activities: ActivityController,
      categories: CategoryController,
      budgets: BudgetController,
    };
  }

  // Health check for all services
  async healthCheck() {
    try {
      const databaseHealth = await this.databaseService.healthCheck();
      const authHealth = await this.authService.isAuthenticated();
      const aiHealth = !!process.env.OPENAI_API_KEY;
      
      return {
        database: databaseHealth,
        auth: { status: authHealth ? 'healthy' : 'unhealthy' },
        ai: { status: aiHealth ? 'healthy' : 'unhealthy', message: aiHealth ? 'OpenAI API key configured' : 'OpenAI API key not configured' },
        overall: databaseHealth.status === 'healthy' && authHealth && aiHealth ? 'healthy' : 'unhealthy'
      };
    } catch (error) {
      console.error('Error performing health check:', error);
      return {
        database: { status: 'unhealthy' },
        auth: { status: 'unhealthy' },
        ai: { status: 'unhealthy' },
        overall: 'unhealthy'
      };
    }
  }

  // Create user
  async createUser(userData: { email: string; displayName?: string; avatarUrl?: string }) {
    try {
      const user = await this.services.users.upsertUser(userData);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Get user by email
  async getUserByEmail(email: string) {
    try {
      const user = await this.services.users.getUserByEmail(email);
      return user;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  // Create group
  async createGroup(groupData: {
    name: string;
    description?: string;
    currency: string;
    category: string;
    monthlyBudget?: number;
    createdBy: string;
  }) {
    try {
      const group = await this.services.groups.createGroup(groupData);
      return group;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  }

  // Get group by ID
  async getGroupById(groupId: string) {
    try {
      const group = await this.services.groups.getGroupById(groupId);
      return group;
    } catch (error) {
      console.error('Error getting group by ID:', error);
      throw error;
    }
  }

  // Add member to group
  async addMemberToGroup(groupId: string, userId: string, role: 'admin' | 'member' = 'member') {
    try {
      const member = await this.services.groups.addMember(groupId, userId, role);
      return member;
    } catch (error) {
      console.error('Error adding member to group:', error);
      throw error;
    }
  }

  // Remove member from group
  async removeMemberFromGroup(groupId: string, userId: string) {
    try {
      const result = await this.services.groups.removeMember(groupId, userId);
      return result;
    } catch (error) {
      console.error('Error removing member from group:', error);
      throw error;
    }
  }

  // Create expense
  async createExpense(expenseData: {
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
    try {
      const expense = await this.services.expenses.createExpense(expenseData);
      return expense;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  }

  // Get expense by ID
  async getExpenseById(expenseId: string) {
    try {
      const expense = await this.services.expenses.getExpenseById(expenseId);
      return expense;
    } catch (error) {
      console.error('Error getting expense by ID:', error);
      throw error;
    }
  }

  // Create payment
  async createPayment(paymentData: {
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
    try {
      const payment = await this.services.payments.createPayment(paymentData);
      return payment;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  // Get payment by ID
  async getPaymentById(paymentId: string) {
    try {
      const payment = await this.services.payments.getPaymentById(paymentId);
      return payment;
    } catch (error) {
      console.error('Error getting payment by ID:', error);
      throw error;
    }
  }

  // Create activity
  async createActivity(activityData: {
    groupId: string;
    userId: string;
    type: 'expense_added' | 'expense_updated' | 'expense_deleted' | 'payment_made' | 'member_added' | 'member_removed' | 'group_created' | 'group_updated' | 'group_settled';
    description: string;
    metadata?: Record<string, any>;
  }) {
    try {
      const activity = await this.services.activities.createActivity(activityData);
      return activity;
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }

  // Get activity by ID
  async getActivityById(activityId: string) {
    try {
      const activity = await this.services.activities.getActivityById(activityId);
      return activity;
    } catch (error) {
      console.error('Error getting activity by ID:', error);
      throw error;
    }
  }

  // Create category
  async createCategory(categoryData: {
    name: string;
    icon?: string;
    color: string;
    isDefault: boolean;
  }) {
    try {
      const category = await this.services.categories.createCategory(categoryData);
      return category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Get all categories
  async getAllCategories() {
    try {
      const categories = await this.services.categories.getAllCategories();
      return categories;
    } catch (error) {
      console.error('Error getting all categories:', error);
      throw error;
    }
  }

  // Create budget
  async createBudget(budgetData: {
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
      const budget = await this.services.budgets.createBudget(budgetData);
      return budget;
    } catch (error) {
      console.error('Error creating budget:', error);
      throw error;
    }
  }

  // Get budget by ID
  async getBudgetById(budgetId: string) {
    try {
      const budget = await this.services.budgets.getBudgetById(budgetId);
      return budget;
    } catch (error) {
      console.error('Error getting budget by ID:', error);
      throw error;
    }
  }

  // Analyze expense with AI
  async analyzeExpense(description: string, amount?: number, category?: string) {
    try {
      const analysis = await this.services.ai.analyzeExpense(description, amount, category);
      return analysis;
    } catch (error) {
      console.error('Error analyzing expense with AI:', error);
      throw error;
    }
  }

  // Categorize expense with AI
  async categorizeExpense(description: string, amount?: number) {
    try {
      const category = await this.services.ai.categorizeExpense(description, amount);
      return category;
    } catch (error) {
      console.error('Error categorizing expense with AI:', error);
      throw error;
    }
  }

  // Split expense with AI
  async splitExpense(totalAmount: number, participants: string[], description: string) {
    try {
      const split = await this.services.ai.splitExpense(totalAmount, participants, description);
      return split;
    } catch (error) {
      console.error('Error splitting expense with AI:', error);
      throw error;
    }
  }

  // Generate expense insights with AI
  async generateExpenseInsights(userId: string, groupId?: string) {
    try {
      const insights = await this.services.ai.generateExpenseInsights(userId, groupId);
      return insights;
    } catch (error) {
      console.error('Error generating expense insights with AI:', error);
      throw error;
    }
  }

  // Generate budget recommendations with AI
  async generateBudgetRecommendations(userId: string, groupId?: string) {
    try {
      const recommendations = await this.services.ai.generateBudgetRecommendations(userId, groupId);
      return recommendations;
    } catch (error) {
      console.error('Error generating budget recommendations with AI:', error);
      throw error;
    }
  }

  // Process natural language query with AI
  async processNaturalLanguageQuery(query: string, userId: string, context?: Record<string, any>) {
    try {
      const response = await this.services.ai.processNaturalLanguageQuery(query, userId, context);
      return response;
    } catch (error) {
      console.error('Error processing natural language query with AI:', error);
      throw error;
    }
  }

  // Generate financial summary with AI
  async generateFinancialSummary(userId: string, period: 'week' | 'month' | 'year' = 'month') {
    try {
      const summary = await this.services.ai.generateFinancialSummary(userId, period);
      return summary;
    } catch (error) {
      console.error('Error generating financial summary with AI:', error);
      throw error;
    }
  }

  // Get top expenses with AI
  async getTopExpenses(userId: string, count: number = 5, period: 'week' | 'month' | 'year' = 'month') {
    try {
      const topExpenses = await this.services.ai.getTopExpenses(userId, count, period);
      return topExpenses;
    } catch (error) {
      console.error('Error getting top expenses with AI:', error);
      throw error;
    }
  }

  // Get user permissions
  async getUserPermissions(userId: string) {
    try {
      const permissions = await this.services.auth.getUserPermissions(userId);
      return permissions;
    } catch (error) {
      console.error('Error getting user permissions:', error);
      throw error;
    }
  }

  // Check if user has permission
  async hasPermission(userId: string, permission: string) {
    try {
      const hasPermission = await this.services.auth.hasPermission(userId, permission);
      return hasPermission;
    } catch (error) {
      console.error('Error checking user permission:', error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const user = await this.services.auth.getCurrentUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  // Get current user ID
  async getCurrentUserId() {
    try {
      const userId = await this.services.auth.getCurrentUserId();
      return userId;
    } catch (error) {
      console.error('Error getting current user ID:', error);
      throw error;
    }
  }

  // Sign in user
  async signIn(email: string, password: string) {
    try {
      const user = await this.services.auth.signIn(email, password);
      return user;
    } catch (error) {
      console.error('Error signing in user:', error);
      throw error;
    }
  }

  // Sign up user
  async signUp(email: string, password: string, displayName?: string) {
    try {
      const user = await this.services.auth.signUp(email, password, displayName);
      return user;
    } catch (error) {
      console.error('Error signing up user:', error);
      throw error;
    }
  }

  // Sign out user
  async signOut() {
    try {
      const result = await this.services.auth.signOut();
      return result;
    } catch (error) {
      console.error('Error signing out user:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  async isAuthenticated() {
    try {
      const isAuthenticated = await this.services.auth.isAuthenticated();
      return isAuthenticated;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      throw error;
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: { displayName?: string; avatarUrl?: string }) {
    try {
      const user = await this.services.auth.updateUserProfile(userId, updates);
      return user;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Get OAuth providers
  getOAuthProviders() {
    try {
      const providers = this.services.auth.getOAuthProviders();
      return providers;
    } catch (error) {
      console.error('Error getting OAuth providers:', error);
      throw error;
    }
  }

  // Sign in with OAuth
  async signInWithOAuth(provider: string) {
    try {
      const result = await this.services.auth.signInWithOAuth(provider);
      return result;
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      throw error;
    }
  }

  // Handle OAuth callback
  async handleOAuthCallback() {
    try {
      const user = await this.services.auth.handleOAuthCallback();
      return user;
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      throw error;
    }
  }

  // Get group expenses
  async getGroupExpenses(groupId: string) {
    try {
      const expenses = await this.services.expenses.getGroupExpenses(groupId);
      return expenses;
    } catch (error) {
      console.error('Error getting group expenses:', error);
      throw error;
    }
  }

  // Get user expenses
  async getUserExpenses(userId: string) {
    try {
      const expenses = await this.services.expenses.getUserExpenses(userId);
      return expenses;
    } catch (error) {
      console.error('Error getting user expenses:', error);
      throw error;
    }
  }

  // Get group payments
  async getGroupPayments(groupId: string) {
    try {
      const payments = await this.services.payments.getGroupPayments(groupId);
      return payments;
    } catch (error) {
      console.error('Error getting group payments:', error);
      throw error;
    }
  }

  // Get user payments
  async getUserPayments(userId: string) {
    try {
      const payments = await this.services.payments.getUserPayments(userId);
      return payments;
    } catch (error) {
      console.error('Error getting user payments:', error);
      throw error;
    }
  }

  // Get group activities
  async getGroupActivities(groupId: string) {
    try {
      const activities = await this.services.activities.getGroupActivities(groupId);
      return activities;
    } catch (error) {
      console.error('Error getting group activities:', error);
      throw error;
    }
  }

  // Get user activities
  async getUserActivities(userId: string) {
    try {
      const activities = await this.services.activities.getUserActivities(userId);
      return activities;
    } catch (error) {
      console.error('Error getting user activities:', error);
      throw error;
    }
  }

  // Get group budgets
  async getGroupBudgets(groupId: string) {
    try {
      const budgets = await this.services.budgets.getGroupBudgets(groupId);
      return budgets;
    } catch (error) {
      console.error('Error getting group budgets:', error);
      throw error;
    }
  }

  // Get default categories
  async getDefaultCategories() {
    try {
      const categories = await this.services.categories.getDefaultCategories();
      return categories;
    } catch (error) {
      console.error('Error getting default categories:', error);
      throw error;
    }
  }

  // Seed default categories
  async seedDefaultCategories() {
    try {
      const result = await this.services.categories.seedDefaultCategories();
      return result;
    } catch (error) {
      console.error('Error seeding default categories:', error);
      throw error;
    }
  }

  // Get category stats
  async getCategoryStats() {
    try {
      const stats = await this.services.categories.getCategoryStats();
      return stats;
    } catch (error) {
      console.error('Error getting category stats:', error);
      throw error;
    }
  }

  // Get budget stats
  async getBudgetStats(groupId: string) {
    try {
      const stats = await this.services.budgets.getBudgetStats(groupId);
      return stats;
    } catch (error) {
      console.error('Error getting budget stats:', error);
      throw error;
    }
  }

  // Get budget utilization
  async getBudgetUtilization(groupId: string, startDate: Date, endDate: Date, categoryId?: string) {
    try {
      const utilization = await this.services.budgets.getBudgetUtilization(groupId, startDate, endDate, categoryId);
      return utilization;
    } catch (error) {
      console.error('Error getting budget utilization:', error);
      throw error;
    }
  }

  // Deactivate expired budgets
  async deactivateExpiredBudgets() {
    try {
      const result = await this.services.budgets.deactivateExpiredBudgets();
      return result;
    } catch (error) {
      console.error('Error deactivating expired budgets:', error);
      throw error;
    }
  }

  // Get budget alerts
  async getBudgetAlerts(groupId: string) {
    try {
      const alerts = await this.services.budgets.getBudgetAlerts(groupId);
      return alerts;
    } catch (error) {
      console.error('Error getting budget alerts:', error);
      throw error;
    }
  }

  // Calculate user balance in a group
  async calculateUserBalance(groupId: string, userId: string) {
    try {
      const balance = await this.services.expenses.calculateUserBalance(groupId, userId);
      return balance;
    } catch (error) {
      console.error('Error calculating user balance:', error);
      throw error;
    }
  }

  // Settle expense participant
  async settleParticipant(expenseId: string, userId: string) {
    try {
      const result = await this.services.expenses.settleParticipant(expenseId, userId);
      return result;
    } catch (error) {
      console.error('Error settling participant:', error);
      throw error;
    }
  }

  // Mark payment as completed
  async markPaymentCompleted(paymentId: string) {
    try {
      const payment = await this.services.payments.markPaymentCompleted(paymentId);
      return payment;
    } catch (error) {
      console.error('Error marking payment as completed:', error);
      throw error;
    }
  }

  // Mark payment as failed
  async markPaymentFailed(paymentId: string) {
    try {
      const payment = await this.services.payments.markPaymentFailed(paymentId);
      return payment;
    } catch (error) {
      console.error('Error marking payment as failed:', error);
      throw error;
    }
  }

  // Get payments between two users in a group
  async getPaymentsBetweenUsers(groupId: string, userId1: string, userId2: string) {
    try {
      const payments = await this.services.payments.getPaymentsBetweenUsers(groupId, userId1, userId2);
      return payments;
    } catch (error) {
      console.error('Error getting payments between users:', error);
      throw error;
    }
  }

  // Get recent user activities
  async getRecentUserActivities(userId: string) {
    try {
      const activities = await this.services.activities.getRecentUserActivities(userId);
      return activities;
    } catch (error) {
      console.error('Error getting recent user activities:', error);
      throw error;
    }
  }

  // Get activity feed for dashboard
  async getActivityFeed(userId: string) {
    try {
      const activities = await this.services.activities.getActivityFeed(userId);
      return activities;
    } catch (error) {
      console.error('Error getting activity feed:', error);
      throw error;
    }
  }

  // Get activity statistics
  async getActivityStats(groupId: string) {
    try {
      const stats = await this.services.activities.getActivityStats(groupId);
      return stats;
    } catch (error) {
      console.error('Error getting activity stats:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId: string) {
    try {
      const result = await this.services.users.deleteUser(userId);
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Update group
  async updateGroup(groupId: string, updateData: Partial<any>) {
    try {
      const group = await this.services.groups.updateGroup(groupId, updateData);
      return group;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  }

  // Delete group
  async deleteGroup(groupId: string) {
    try {
      const result = await this.services.groups.deleteGroup(groupId);
      return result;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  }

  // Update expense
  async updateExpense(expenseId: string, updateData: Partial<any>) {
    try {
      const expense = await this.services.expenses.updateExpense(expenseId, updateData);
      return expense;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  }

  // Delete expense
  async deleteExpense(expenseId: string) {
    try {
      const result = await this.services.expenses.deleteExpense(expenseId);
      return result;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }

  // Update payment
  async updatePayment(paymentId: string, updateData: Partial<any>) {
    try {
      const payment = await this.services.payments.updatePayment(paymentId, updateData);
      return payment;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  }

  // Delete payment
  async deletePayment(paymentId: string) {
    try {
      const result = await this.services.payments.deletePayment(paymentId);
      return result;
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  }

  // Update category
  async updateCategory(categoryId: string, updateData: Partial<any>) {
    try {
      const category = await this.services.categories.updateCategory(categoryId, updateData);
      return category;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  // Delete category
  async deleteCategory(categoryId: string) {
    try {
      const result = await this.services.categories.deleteCategory(categoryId);
      return result;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  // Update budget
  async updateBudget(budgetId: string, updateData: Partial<any>) {
    try {
      const budget = await this.services.budgets.updateBudget(budgetId, updateData);
      return budget;
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  }

  // Delete budget
  async deleteBudget(budgetId: string) {
    try {
      const result = await this.services.budgets.deleteBudget(budgetId);
      return result;
    } catch (error) {
      console.error('Error deleting budget:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export default SplitMateService.getInstance();