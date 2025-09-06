import { pgTable, text, integer, decimal, timestamp, boolean, uuid, serial, pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';

// Enums
export const expenseCategoryEnum = pgEnum('expense_category', [
  'food',
  'transport',
  'entertainment',
  'shopping',
  'utilities',
  'healthcare',
  'education',
  'travel',
  'other'
]);

export const settlementStatusEnum = pgEnum('settlement_status', [
  'pending',
  'paid',
  'cancelled'
]);

// Users table (synced with StackAuth)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // StackAuth user ID
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  profileImageUrl: text('profile_image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Groups table
export const groups = pgTable('groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdBy: text('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Group members table (many-to-many relationship)
export const groupMembers = pgTable('group_members', {
  id: serial('id').primaryKey(),
  groupId: uuid('group_id').notNull().references(() => groups.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  isAdmin: boolean('is_admin').default(false).notNull(),
});

// Expenses table
export const expenses = pgTable('expenses', {
  id: uuid('id').defaultRandom().primaryKey(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  category: expenseCategoryEnum('category').notNull(),
  paidBy: text('paid_by').notNull().references(() => users.id),
  groupId: uuid('group_id').references(() => groups.id),
  receiptUrl: text('receipt_url'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Expense participants table (who owes what for each expense)
export const expenseParticipants = pgTable('expense_participants', {
  id: serial('id').primaryKey(),
  expenseId: uuid('expense_id').notNull().references(() => expenses.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id),
  owedAmount: decimal('owed_amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Settlements table (tracking payments between users)
export const settlements = pgTable('settlements', {
  id: uuid('id').defaultRandom().primaryKey(),
  fromUserId: text('from_user_id').notNull().references(() => users.id),
  toUserId: text('to_user_id').notNull().references(() => users.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: settlementStatusEnum('status').default('pending').notNull(),
  groupId: uuid('group_id').references(() => groups.id),
  expenseId: uuid('expense_id').references(() => expenses.id),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').notNull(), // 'expense', 'payment', 'reminder', etc.
  isRead: boolean('is_read').default(false).notNull(),
  relatedExpenseId: uuid('related_expense_id').references(() => expenses.id),
  relatedGroupId: uuid('related_group_id').references(() => groups.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  createdGroups: many(groups),
  groupMemberships: many(groupMembers),
  paidExpenses: many(expenses),
  expenseParticipations: many(expenseParticipants),
  sentSettlements: many(settlements, { relationName: 'sentSettlements' }),
  receivedSettlements: many(settlements, { relationName: 'receivedSettlements' }),
  notifications: many(notifications),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  creator: one(users, {
    fields: [groups.createdBy],
    references: [users.id],
  }),
  members: many(groupMembers),
  expenses: many(expenses),
  settlements: many(settlements),
  notifications: many(notifications),
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
  paidByUser: one(users, {
    fields: [expenses.paidBy],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [expenses.groupId],
    references: [groups.id],
  }),
  participants: many(expenseParticipants),
  settlements: many(settlements),
  notifications: many(notifications),
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

export const settlementsRelations = relations(settlements, ({ one }) => ({
  fromUser: one(users, {
    fields: [settlements.fromUserId],
    references: [users.id],
    relationName: 'sentSettlements',
  }),
  toUser: one(users, {
    fields: [settlements.toUserId],
    references: [users.id],
    relationName: 'receivedSettlements',
  }),
  group: one(groups, {
    fields: [settlements.groupId],
    references: [groups.id],
  }),
  expense: one(expenses, {
    fields: [settlements.expenseId],
    references: [expenses.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  relatedExpense: one(expenses, {
    fields: [notifications.relatedExpenseId],
    references: [expenses.id],
  }),
  relatedGroup: one(groups, {
    fields: [notifications.relatedGroupId],
    references: [groups.id],
  }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertGroupSchema = createInsertSchema(groups);
export const selectGroupSchema = createSelectSchema(groups);

export const insertGroupMemberSchema = createInsertSchema(groupMembers);
export const selectGroupMemberSchema = createSelectSchema(groupMembers);

export const insertExpenseSchema = createInsertSchema(expenses);
export const selectExpenseSchema = createSelectSchema(expenses);

export const insertExpenseParticipantSchema = createInsertSchema(expenseParticipants);
export const selectExpenseParticipantSchema = createSelectSchema(expenseParticipants);

export const insertSettlementSchema = createInsertSchema(settlements);
export const selectSettlementSchema = createSelectSchema(settlements);

export const insertNotificationSchema = createInsertSchema(notifications);
export const selectNotificationSchema = createSelectSchema(notifications);

// Types
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

export type Settlement = typeof settlements.$inferSelect;
export type NewSettlement = typeof settlements.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;