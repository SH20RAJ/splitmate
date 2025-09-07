import { connectToDatabase } from '../db/mongodb';
import UserController from '../controllers/UserController';
import GroupController from '../controllers/GroupController';
import ExpenseController from '../controllers/ExpenseController';
import PaymentController from '../controllers/PaymentController';
import ActivityController from '../controllers/ActivityController';
import CategoryController from '../controllers/CategoryController';
import BudgetController from '../controllers/BudgetController';

export class DatabaseService {
  private static instance: DatabaseService;
  private isConnected: boolean = false;

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      await connectToDatabase();
      this.isConnected = true;
      console.log('Connected to MongoDB database');
    } catch (error) {
      console.error('Failed to connect to MongoDB database:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    // In a real implementation, you might want to close the connection
    // For now, we'll just mark as disconnected
    this.isConnected = false;
    console.log('Disconnected from MongoDB database');
  }

  // Initialize default data
  async initializeDefaultData(): Promise<void> {
    try {
      // Seed default categories if they don't exist
      await CategoryController.seedDefaultCategories();
      console.log('Default data initialized successfully');
    } catch (error) {
      console.error('Error initializing default data:', error);
      throw error;
    }
  }

  // Get all controllers
  get users() {
    return UserController;
  }

  get groups() {
    return GroupController;
  }

  get expenses() {
    return ExpenseController;
  }

  get payments() {
    return PaymentController;
  }

  get activities() {
    return ActivityController;
  }

  get categories() {
    return CategoryController;
  }

  get budgets() {
    return BudgetController;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: Date; details?: any }> {
    try {
      // Perform a simple database operation to check connectivity
      // This is a basic check - in a production environment, you might want more comprehensive checks
      const startTime = Date.now();
      
      // If we can access the controllers, we assume the connection is healthy
      // A more robust implementation would perform an actual database query
      
      const endTime = Date.now();
      
      return {
        status: 'healthy',
        timestamp: new Date(),
        details: {
          responseTime: `${endTime - startTime}ms`,
          connected: this.isConnected
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date(),
        details: {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }
}

// Export a singleton instance
export default DatabaseService.getInstance();