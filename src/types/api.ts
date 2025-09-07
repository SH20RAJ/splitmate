// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// User Types
export interface User {
  _id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Group Types
export interface Group {
  _id: string;
  name: string;
  description?: string;
  currency: string;
  category: string;
  monthlyBudget?: number;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  role?: 'member' | 'admin';
  balance?: number;
  joinedAt?: string;
}

export interface GroupMember {
  _id: string;
  groupId: string;
  userId: User;
  role: 'member' | 'admin';
  balance: number;
  joinedAt: string;
}

// Expense Types
export interface Expense {
  _id: string;
  groupId: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  category: string;
  paidById: User;
  receiptUrl?: string;
  splitType: 'equal' | 'percentage' | 'amount' | 'custom';
  expenseDate: string;
  status: 'pending' | 'settled' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseParticipant {
  _id: string;
  expenseId: string;
  userId: string;
  shareAmount: number;
  sharePercentage?: number;
  isPaid: boolean;
}

// Payment Types
export interface Payment {
  _id: string;
  groupId: string;
  fromUserId: User;
  toUserId: User;
  amount: number;
  currency: string;
  description?: string;
  method: 'cash' | 'upi' | 'bank_transfer' | 'card' | 'other';
  transactionId?: string;
  paymentDate: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Settlement Types
export interface SettlementSuggestion {
  fromUser: User;
  toUser: User;
  amount: number;
  currency: string;
}

// Activity Types
export interface Activity {
  _id: string;
  groupId: string;
  userId: User;
  type: 'group_created' | 'member_added' | 'member_removed' | 'expense_added' | 'expense_updated' | 'expense_deleted' | 'payment_made' | 'payment_received' | 'group_updated';
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  icon?: string;
  color: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// Balance Types
export interface UserBalance {
  userId: string;
  groupId: string;
  totalOwed: number;
  totalOwing: number;
  netBalance: number;
  currency: string;
}

// Create/Update Types
export interface CreateUserData {
  email: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface CreateGroupData {
  name: string;
  description?: string;
  currency: string;
  category: string;
  monthlyBudget?: number;
  createdBy: string;
}

export interface CreateExpenseData {
  groupId: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  category: string;
  paidById: string;
  receiptUrl?: string;
  splitType: 'equal' | 'percentage' | 'amount' | 'custom';
  expenseDate: string;
  participants: Array<{
    userId: string;
    shareAmount: number;
    sharePercentage?: number;
  }>;
}

export interface CreatePaymentData {
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: string;
  description?: string;
  method: 'cash' | 'upi' | 'bank_transfer' | 'card' | 'other';
  transactionId?: string;
  paymentDate?: string;
}

export interface CreateCategoryData {
  name: string;
  icon?: string;
  color?: string;
  isDefault?: boolean;
}
