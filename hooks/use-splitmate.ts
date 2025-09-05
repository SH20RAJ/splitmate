import { useState, useCallback } from 'react';

// Define types for our data structures
interface SplitBillData {
  amount: number;
  description: string;
  participants: string[];
}

interface QrCodeData {
  amount: number;
  description?: string;
  upiId?: string;
}

interface ReminderData {
  amount: number;
  description: string;
  recipientName: string;
  recipientPhone?: string;
  upiId?: string;
}

interface SplitResult {
  totalAmount: number;
  splits: { person: string; amount: number }[];
  description: string;
}

interface QrResult {
  qrCode: string;
  upiLink: string;
  amount: number;
  description: string;
}

interface WebShareData {
  title: string;
  text: string;
  url: string;
}

interface ReminderResult {
  whatsappLink: string;
  webShareData: WebShareData;
  upiLink: string;
  amount: number;
  description: string;
  recipientName: string;
}

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  createdAt: string;
}

export function useSplitMate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Split bill
  const splitBill = useCallback(async (data: SplitBillData): Promise<SplitResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/split', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to split bill');
      }
      
      const result: SplitResult = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generate QR code
  const generateQrCode = useCallback(async (data: QrCodeData): Promise<QrResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }
      
      const result: QrResult = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send reminder
  const sendReminder = useCallback(async (data: ReminderData): Promise<ReminderResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/remind', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send reminder');
      }
      
      const result: ReminderResult = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get expenses
  const getExpenses = useCallback(async (): Promise<Expense[] | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/expenses');
      
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      
      const expenses: Expense[] = await response.json();
      return expenses;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get groups
  const getGroups = useCallback(async (): Promise<Group[] | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/groups');
      
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      
      const groups: Group[] = await response.json();
      return groups;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    splitBill,
    generateQrCode,
    sendReminder,
    getExpenses,
    getGroups,
  };
}