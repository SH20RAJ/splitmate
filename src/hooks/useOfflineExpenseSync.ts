import { useState, useEffect, useCallback } from 'react';
import { expenseSyncService, SyncEvent, SyncProgress } from '@/lib/expense-sync-service';
import { offlineExpenseService } from '@/lib/offline-expense-service';

export const useOfflineExpenseSync = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [syncProgress, setSyncProgress] = useState<SyncProgress>({
    status: 'idle',
    total: 0,
    processed: 0,
    errors: 0
  });
  const [pendingExpensesCount, setPendingExpensesCount] = useState(0);

  // Update online status
  const updateOnlineStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
  }, []);

  // Handle sync events
  const handleSyncEvent = useCallback((event: SyncEvent) => {
    switch (event.type) {
      case 'sync-start':
        setSyncProgress({
          status: 'syncing',
          total: 0,
          processed: 0,
          errors: 0
        });
        break;
      case 'sync-progress':
        setSyncProgress(event.data as SyncProgress);
        break;
      case 'sync-complete':
        setSyncProgress(event.data as SyncProgress);
        // Refresh pending expenses count after sync
        refreshPendingExpensesCount();
        break;
      case 'sync-error':
        setSyncProgress({
          status: 'failed',
          total: 0,
          processed: 0,
          errors: 1
        });
        break;
    }
  }, []);

 // Refresh pending expenses count
  const refreshPendingExpensesCount = useCallback(async () => {
    try {
      const pendingExpenses = await offlineExpenseService.getPendingExpenses();
      setPendingExpensesCount(pendingExpenses.length);
    } catch (error) {
      console.error('Error getting pending expenses count:', error);
      setPendingExpensesCount(0);
    }
  }, []);

  // Initialize services and set up event listeners
  useEffect(() => {
    // Initialize IndexedDB
    offlineExpenseService.init().catch((error: any) => {
      console.error('Failed to initialize IndexedDB:', error);
    });

    // Set up event listeners
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Add sync event listener
    expenseSyncService.addListener(handleSyncEvent);
    
    // Start auto sync
    expenseSyncService.startAutoSync();

    // Initial status update
    updateOnlineStatus();
    
    // Get initial pending expenses count
    refreshPendingExpensesCount();

    // Cleanup
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      expenseSyncService.removeListener(handleSyncEvent);
    };
  }, [updateOnlineStatus, handleSyncEvent, refreshPendingExpensesCount]);

  // Manually trigger sync
  const triggerSync = useCallback(() => {
    if (isOnline) {
      expenseSyncService.syncExpenses();
    }
  }, [isOnline]);

  return {
    isOnline,
    syncProgress,
    pendingExpensesCount,
    triggerSync,
    refreshPendingExpensesCount
  };
};