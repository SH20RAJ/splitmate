import { sqliteTable, text, integer, real, primaryKey, index } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  avatarUrl: text('avatar_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  emailIndex: index('users_email_idx').on(table.email),
}));

// Groups table
export const groups = sqliteTable('groups', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  description: text('description'),
  currency: text('currency').notNull().default('₹'),
  category: text('category').notNull().default('General'),
  monthlyBudget: real('monthly_budget'),
  status: text('status', { enum: ['active', 'settled', 'archived'] }).notNull().default('active'),
  createdBy: text('created_by').notNull().references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  createdByIndex: index('groups_created_by_idx').on(table.createdBy),
  statusIndex: index('groups_status_idx').on(table.status),
}));

// Group members table (many-to-many relationship)
export const groupMembers = sqliteTable('group_members', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  groupId: text('group_id').notNull().references(() => groups.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role', { enum: ['admin', 'member'] }).notNull().default('member'),
  balance: real('balance').notNull().default(0), // How much this user owes/is owed in the group
  joinedAt: integer('joined_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  groupUserPk: primaryKey({ columns: [table.groupId, table.userId] }),
  groupIdIndex: index('group_members_group_id_idx').on(table.groupId),
  userIdIndex: index('group_members_user_id_idx').on(table.userId),
}));

// Expenses table
export const expenses = sqliteTable('expenses', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  groupId: text('group_id').notNull().references(() => groups.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('₹'),
  category: text('category').notNull().default('Other'),
  paidById: text('paid_by_id').notNull().references(() => users.id),
  receiptUrl: text('receipt_url'),
  splitType: text('split_type', { enum: ['equal', 'percentage', 'amount', 'custom'] }).notNull().default('equal'),
  status: text('status', { enum: ['pending', 'processing', 'settled'] }).notNull().default('pending'),
  expenseDate: integer('expense_date', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  groupIdIndex: index('expenses_group_id_idx').on(table.groupId),
  paidByIdIndex: index('expenses_paid_by_id_idx').on(table.paidById),
  statusIndex: index('expenses_status_idx').on(table.status),
  categoryIndex: index('expenses_category_idx').on(table.category),
  expenseDateIndex: index('expenses_expense_date_idx').on(table.expenseDate),
}));

// Expense participants table (tracks who owes what for each expense)
export const expenseParticipants = sqliteTable('expense_participants', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  expenseId: text('expense_id').notNull().references(() => expenses.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id),
  shareAmount: real('share_amount').notNull(), // How much this user owes for this expense
  sharePercentage: real('share_percentage'), // If using percentage split
  isPaid: integer('is_paid', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  expenseUserPk: primaryKey({ columns: [table.expenseId, table.userId] }),
  expenseIdIndex: index('expense_participants_expense_id_idx').on(table.expenseId),
  userIdIndex: index('expense_participants_user_id_idx').on(table.userId),
}));

// Payments table (tracks settlements between users)
export const payments = sqliteTable('payments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  groupId: text('group_id').notNull().references(() => groups.id),
  fromUserId: text('from_user_id').notNull().references(() => users.id),
  toUserId: text('to_user_id').notNull().references(() => users.id),
  amount: real('amount').notNull(),
  currency: text('currency').notNull().default('₹'),
  description: text('description'),
  method: text('method', { enum: ['cash', 'upi', 'bank_transfer', 'card', 'other'] }),
  status: text('status', { enum: ['pending', 'completed', 'failed'] }).notNull().default('pending'),
  transactionId: text('transaction_id'),
  paymentDate: integer('payment_date', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  groupIdIndex: index('payments_group_id_idx').on(table.groupId),
  fromUserIdIndex: index('payments_from_user_id_idx').on(table.fromUserId),
  toUserIdIndex: index('payments_to_user_id_idx').on(table.toUserId),
  statusIndex: index('payments_status_idx').on(table.status),
}));

// Activity log table (for tracking all activities)
export const activities = sqliteTable('activities', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  groupId: text('group_id').notNull().references(() => groups.id),
  userId: text('user_id').notNull().references(() => users.id),
  type: text('type', { 
    enum: ['expense_added', 'expense_updated', 'expense_deleted', 'payment_made', 'member_added', 'member_removed', 'group_created', 'group_updated', 'group_settled']
  }).notNull(),
  description: text('description').notNull(),
  metadata: text('metadata'), // JSON string for additional data
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  groupIdIndex: index('activities_group_id_idx').on(table.groupId),
  userIdIndex: index('activities_user_id_idx').on(table.userId),
  typeIndex: index('activities_type_idx').on(table.type),
  createdAtIndex: index('activities_created_at_idx').on(table.createdAt),
}));

// Categories table (for expense categorization)
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull().unique(),
  icon: text('icon'),
  color: text('color').notNull().default('#6366f1'),
  isDefault: integer('is_default', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  nameIndex: index('categories_name_idx').on(table.name),
}));

// Budgets table (for tracking group budgets)
export const budgets = sqliteTable('budgets', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  groupId: text('group_id').notNull().references(() => groups.id, { onDelete: 'cascade' }),
  categoryId: text('category_id').references(() => categories.id),
  name: text('name').notNull(),
  amount: real('amount').notNull(),
  period: text('period', { enum: ['weekly', 'monthly', 'yearly'] }).notNull().default('monthly'),
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => ({
  groupIdIndex: index('budgets_group_id_idx').on(table.groupId),
  categoryIdIndex: index('budgets_category_id_idx').on(table.categoryId),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  groupMembers: many(groupMembers),
  expensesCreated: many(expenses),
  expenseParticipants: many(expenseParticipants),
  paymentsFrom: many(payments, { relationName: 'paymentsFrom' }),
  paymentsTo: many(payments, { relationName: 'paymentsTo' }),
  activities: many(activities),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  creator: one(users, {
    fields: [groups.createdBy],
    references: [users.id],
  }),
  members: many(groupMembers),
  expenses: many(expenses),
  payments: many(payments),
  activities: many(activities),
  budgets: many(budgets),
}));

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id],
  }),
}));

export const expensesRelations = relations(expenses, ({ one, many }) => ({
  group: one(groups, {
    fields: [expenses.groupId],
    references: [groups.id],
  }),
  paidBy: one(users, {
    fields: [expenses.paidById],
    references: [users.id],
  }),
  participants: many(expenseParticipants),
}));

export const expenseParticipantsRelations = relations(expenseParticipants, ({ one }) => ({
  expense: one(expenses, {
    fields: [expenseParticipants.expenseId],
    references: [expenses.id],
  }),
  user: one(users, {
    fields: [expenseParticipants.userId],
    references: [users.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  group: one(groups, {
    fields: [payments.groupId],
    references: [groups.id],
  }),
  fromUser: one(users, {
    fields: [payments.fromUserId],
    references: [users.id],
    relationName: 'paymentsFrom',
  }),
  toUser: one(users, {
    fields: [payments.toUserId],
    references: [users.id],
    relationName: 'paymentsTo',
  }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  group: one(groups, {
    fields: [activities.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  budgets: many(budgets),
}));

export const budgetsRelations = relations(budgets, ({ one }) => ({
  group: one(groups, {
    fields: [budgets.groupId],
    references: [groups.id],
  }),
  category: one(categories, {
    fields: [budgets.categoryId],
    references: [categories.id],
  }),
}));

// Export types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Group = typeof groups.$inferSelect;
export type NewGroup = typeof groups.$inferInsert;
export type GroupMember = typeof groupMembers.$inferSelect;
export type NewGroupMember = typeof groupMembers.$inferInsert;
export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;
export type ExpenseParticipant = typeof expenseParticipants.$inferSelect;
export type NewExpenseParticipant = typeof expenseParticipants.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Budget = typeof budgets.$inferSelect;
export type NewBudget = typeof budgets.$inferInsert;
