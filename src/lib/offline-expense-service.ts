import { CreateExpenseData, Expense } from '@/types/api';

// Define the structure for offline expenses
export interface OfflineExpense extends CreateExpenseData {
  id: string;
  timestamp: number;
  syncStatus: 'pending' | 'syncing' | 'synced' | 'failed';
  retryCount: number;
}

// Database configuration
const DB_NAME = 'SplitMateDB';
const DB_VERSION = 1;
const EXPENSES_STORE = 'expenses';

class OfflineExpenseService {
  private db: IDBDatabase | null = null;

  // Initialize the database
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB');
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create expenses object store
        if (!db.objectStoreNames.contains(EXPENSES_STORE)) {
          const store = db.createObjectStore(EXPENSES_STORE, { keyPath: 'id' });
          store.createIndex('groupId', 'groupId', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('syncStatus', 'syncStatus', { unique: false });
        }
      };
    });
  }

  // Add an expense to the local database
  async addExpense(expense: CreateExpenseData): Promise<OfflineExpense> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const offlineExpense: OfflineExpense = {
      ...expense,
      id: `offline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      syncStatus: 'pending',
      retryCount: 0
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXPENSES_STORE], 'readwrite');
      const store = transaction.objectStore(EXPENSES_STORE);
      const request = store.add(offlineExpense);

      request.onsuccess = () => {
        resolve(offlineExpense);
      };

      request.onerror = () => {
        console.error('Failed to add expense to IndexedDB');
        reject(new Error('Failed to add expense to IndexedDB'));
      };
    });
  }

  // Check if an expense with similar details already exists
  async expenseExists(expense: CreateExpenseData): Promise<boolean> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXPENSES_STORE], 'readonly');
      const store = transaction.objectStore(EXPENSES_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const expenses = request.result as OfflineExpense[];
        const exists = expenses.some(e => 
          e.groupId === expense.groupId &&
          e.name === expense.name &&
          e.amount === expense.amount &&
          e.paidById === expense.paidById &&
          Math.abs(e.timestamp - Date.now()) < 5000 // Within 5 seconds
        );
        resolve(exists);
      };

      request.onerror = () => {
        console.error('Failed to check for existing expense in IndexedDB');
        reject(new Error('Failed to check for existing expense in IndexedDB'));
      };
    });
  }

  // Get all pending expenses
  async getPendingExpenses(): Promise<OfflineExpense[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXPENSES_STORE], 'readonly');
      const store = transaction.objectStore(EXPENSES_STORE);
      const index = store.index('syncStatus');
      const request = index.getAll('pending');

      request.onsuccess = () => {
        resolve(request.result as OfflineExpense[]);
      };

      request.onerror = () => {
        console.error('Failed to get pending expenses from IndexedDB');
        reject(new Error('Failed to get pending expenses from IndexedDB'));
      };
    });
  }

  // Update expense sync status
  async updateExpenseSyncStatus(id: string, status: OfflineExpense['syncStatus'], retryCount?: number): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXPENSES_STORE], 'readwrite');
      const store = transaction.objectStore(EXPENSES_STORE);
      
      const getRequest = store.get(id);
      getRequest.onsuccess = () => {
        const expense = getRequest.result as OfflineExpense;
        if (expense) {
          expense.syncStatus = status;
          if (retryCount !== undefined) {
            expense.retryCount = retryCount;
          }
          
          const putRequest = store.put(expense);
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => {
            console.error('Failed to update expense sync status');
            reject(new Error('Failed to update expense sync status'));
          };
        } else {
          reject(new Error('Expense not found'));
        }
      };
      
      getRequest.onerror = () => {
        console.error('Failed to get expense for updating sync status');
        reject(new Error('Failed to get expense for updating sync status'));
      };
    });
  }

  // Delete synced expense
  async deleteExpense(id: string): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXPENSES_STORE], 'readwrite');
      const store = transaction.objectStore(EXPENSES_STORE);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('Failed to delete expense from IndexedDB');
        reject(new Error('Failed to delete expense from IndexedDB'));
      };
    });
  }

  // Get all expenses (for debugging)
  async getAllExpenses(): Promise<OfflineExpense[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([EXPENSES_STORE], 'readonly');
      const store = transaction.objectStore(EXPENSES_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result as OfflineExpense[]);
      };

      request.onerror = () => {
        console.error('Failed to get all expenses from IndexedDB');
        reject(new Error('Failed to get all expenses from IndexedDB'));
      };
    });
  }
}

// Export singleton instance
const offlineExpenseService = new OfflineExpenseService();
export { offlineExpenseService };
export default offlineExpenseService;