import { offlineExpenseService, OfflineExpense } from './offline-expense-service';
import { apiService } from '@/services/api.service';
import { CreateExpenseData } from '@/types/api';

// Sync status types
export type SyncStatus = 'idle' | 'syncing' | 'completed' | 'failed';
export type SyncProgress = {
  status: SyncStatus;
  total: number;
  processed: number;
 errors: number;
};

// Event types for sync status updates
export type SyncEvent = {
  type: 'sync-start' | 'sync-progress' | 'sync-complete' | 'sync-error';
  data?: SyncProgress | Error | null;
};

class ExpenseSyncService {
  private isSyncing = false;
  private listeners: ((event: SyncEvent) => void)[] = [];
  private maxRetries = 3;

  // Add event listener for sync status updates
  addListener(listener: (event: SyncEvent) => void) {
    this.listeners.push(listener);
 }

  // Remove event listener
  removeListener(listener: (event: SyncEvent) => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // Notify all listeners of an event
  private notifyListeners(event: SyncEvent) {
    this.listeners.forEach(listener => listener(event));
  }

  // Check if we're online
  private isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

 // Sync pending expenses with the server
  async syncExpenses(): Promise<void> {
    // Don't sync if already syncing or offline
    if (this.isSyncing || !this.isOnline()) {
      return;
    }

    this.isSyncing = true;
    this.notifyListeners({ type: 'sync-start' });

    try {
      const pendingExpenses = await offlineExpenseService.getPendingExpenses();
      
      if (pendingExpenses.length === 0) {
        this.notifyListeners({ 
          type: 'sync-complete', 
          data: { status: 'completed', total: 0, processed: 0, errors: 0 } 
        });
        this.isSyncing = false;
        return;
      }

      let processed = 0;
      let errors = 0;
      const total = pendingExpenses.length;

      this.notifyListeners({ 
        type: 'sync-progress', 
        data: { status: 'syncing', total, processed, errors } 
      });

      // Process each pending expense
      for (const expense of pendingExpenses) {
        try {
          // Update status to syncing
          await offlineExpenseService.updateExpenseSyncStatus(expense.id, 'syncing');
          
          // Prepare expense data for server (remove local-only properties)
          const { id, timestamp, syncStatus, retryCount, ...serverExpenseData } = expense;
          
          // Send to server
          const response = await apiService.createExpense(serverExpenseData as CreateExpenseData);
          
          if (response.success && response.data) {
            // Successfully synced, remove from local storage
            await offlineExpenseService.deleteExpense(expense.id);
            processed++;
          } else {
            // Failed to sync, update status and increment retry count
            await offlineExpenseService.updateExpenseSyncStatus(
              expense.id, 
              'failed', 
              expense.retryCount + 1
            );
            errors++;
            
            // If we've exceeded max retries, mark as permanently failed
            if (expense.retryCount + 1 >= this.maxRetries) {
              console.error(`Failed to sync expense ${expense.id} after ${this.maxRetries} attempts`);
            }
          }
        } catch (error) {
          // Network error or other issue
          await offlineExpenseService.updateExpenseSyncStatus(
            expense.id, 
            'failed', 
            expense.retryCount + 1
          );
          errors++;
          console.error(`Error syncing expense ${expense.id}:`, error);
        }

        // Notify progress update
        this.notifyListeners({ 
          type: 'sync-progress', 
          data: { status: 'syncing', total, processed, errors } 
        });
      }

      // Sync complete
      this.notifyListeners({ 
        type: 'sync-complete', 
        data: { status: processed === total ? 'completed' : 'failed', total, processed, errors } 
      });
    } catch (error) {
      console.error('Error during expense sync:', error);
      this.notifyListeners({ 
        type: 'sync-error', 
        data: error instanceof Error ? error : new Error('Unknown sync error') 
      });
    } finally {
      this.isSyncing = false;
    }
  }

  // Check for conflicts between local and server data
  async checkForConflicts(): Promise<void> {
    // In a more complex implementation, this would check for conflicts
    // between local and server data and resolve them appropriately
    // For now, we're assuming the offline-first approach handles this
    console.log('Checking for conflicts between local and server data');
  }

  // Start automatic syncing when online status changes
  startAutoSync() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        // When coming back online, trigger sync
        this.syncExpenses();
      });
    }
  }
}

// Export singleton instance
export const expenseSyncService = new ExpenseSyncService();
export default expenseSyncService;