export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  upi_id?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  members: GroupMember[];
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  user_id: string;
  user: User;
  joined_at: string;
}

export interface Expense {
  id: string;
  group_id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  paid_by: string;
  split_between: ExpenseSplit[];
  receipt_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseSplit {
  user_id: string;
  amount: number;
  paid: boolean;
  paid_at?: string;
}

export type ExpenseCategory = 
  | 'food' 
  | 'transport' 
  | 'accommodation' 
  | 'entertainment' 
  | 'shopping' 
  | 'bills' 
  | 'other';

export interface Balance {
  user_id: string;
  owes_to: string;
  amount: number;
}

export interface Settlement {
  id: string;
  from_user: string;
  to_user: string;
  amount: number;
  group_id: string;
  settled_at: string;
  payment_method?: 'upi' | 'cash' | 'bank_transfer';
  transaction_id?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  expense_data?: Partial<Expense>;
  created_at: string;
}

export const CATEGORY_EMOJIS: Record<ExpenseCategory, string> = {
  food: '🍕',
  transport: '🚕',
  accommodation: '🏠',
  entertainment: '🎬',
  shopping: '🛍️',
  bills: '💡',
  other: '📝'
};

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: 'Food & Dining',
  transport: 'Transport',
  accommodation: 'Accommodation',
  entertainment: 'Entertainment',
  shopping: 'Shopping',
  bills: 'Bills & Utilities',
  other: 'Other'
};
