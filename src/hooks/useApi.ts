import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api.service';
import {
  User,
  Group,
  GroupMember,
  Expense,
  Payment,
  Activity,
  Category,
  UserBalance,
  SettlementSuggestion,
  CreateGroupData,
  CreateExpenseData,
  CreatePaymentData,
} from '@/types/api';

// Generic hook for API calls
function useApiCall<T>(
  apiCall: () => Promise<{ success: boolean; data?: T; error?: string }>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        
        if (isMounted) {
          if (response.success && response.data) {
            setData(response.data);
          } else {
            setError(response.error || 'Unknown error');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiCall]);

  const refetch = async () => {
    const response = await apiCall();
    if (response.success && response.data) {
      setData(response.data);
      setError(null);
    } else {
      setError(response.error || 'Unknown error');
    }
  };

  return { data, loading, error, refetch };
}

// User hooks
export function useUser(email: string) {
  const apiCall = useCallback(() => apiService.getUserByEmail(email), [email]);
  return useApiCall<User>(apiCall);
}

// Group hooks
export function useUserGroups(userId: string) {
  const apiCall = useCallback(() => apiService.getUserGroups(userId), [userId]);
  return useApiCall<Group[]>(apiCall);
}

export function useGroup(groupId: string) {
  const apiCall = useCallback(() => apiService.getGroupById(groupId), [groupId]);
  return useApiCall<Group>(apiCall);
}

export function useGroupMembers(groupId: string) {
  const apiCall = useCallback(() => apiService.getGroupMembers(groupId), [groupId]);
  return useApiCall<GroupMember[]>(apiCall);
}

// Expense hooks
export function useGroupExpenses(groupId: string) {
  const apiCall = useCallback(() => apiService.getGroupExpenses(groupId), [groupId]);
  return useApiCall<Expense[]>(apiCall);
}

export function useUserExpenses(userId: string) {
  const apiCall = useCallback(() => apiService.getUserExpenses(userId), [userId]);
  return useApiCall<Expense[]>(apiCall);
}

export function useExpense(expenseId: string) {
  const apiCall = useCallback(() => apiService.getExpenseById(expenseId), [expenseId]);
  return useApiCall<Expense>(apiCall);
}

// Payment hooks
export function useGroupPayments(groupId: string) {
  const apiCall = useCallback(() => apiService.getGroupPayments(groupId), [groupId]);
  return useApiCall<Payment[]>(apiCall);
}

export function useUserPayments(userId: string) {
  const apiCall = useCallback(() => apiService.getUserPayments(userId), [userId]);
  return useApiCall<Payment[]>(apiCall);
}

// Balance hooks
export function useUserBalance(groupId: string, userId: string) {
  const apiCall = useCallback(() => apiService.getUserBalance(groupId, userId), [groupId, userId]);
  return useApiCall<UserBalance>(apiCall);
}

// Settlement hooks
export function useSettlementSuggestions(groupId: string) {
  const apiCall = useCallback(() => apiService.getSettlementSuggestions(groupId), [groupId]);
  return useApiCall<SettlementSuggestion[]>(apiCall);
}

// Activity hooks
export function useGroupActivities(groupId: string) {
  const apiCall = useCallback(() => apiService.getGroupActivities(groupId), [groupId]);
  return useApiCall<Activity[]>(apiCall);
}

// Category hooks
export function useCategories() {
  const apiCall = useCallback(() => apiService.getCategories(), []);
  return useApiCall<Category[]>(apiCall);
}

// Mutation hooks (for create/update operations)
export function useCreateGroup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGroup = async (groupData: CreateGroupData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.createGroup(groupData);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to create group');
        throw new Error(response.error || 'Failed to create group');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createGroup, loading, error };
}

export function useCreateExpense() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createExpense = async (expenseData: CreateExpenseData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.createExpense(expenseData);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to create expense');
        throw new Error(response.error || 'Failed to create expense');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createExpense, loading, error };
}

export function useCreatePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (paymentData: CreatePaymentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.createPayment(paymentData);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to create payment');
        throw new Error(response.error || 'Failed to create payment');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPayment, loading, error };
}
