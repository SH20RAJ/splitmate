import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { 
  users, groups, groupMembers, expenses, expenseParticipants, 
  payments, activities, categories, budgets,
  usersRelations, groupsRelations, groupMembersRelations,
  expensesRelations, expenseParticipantsRelations, paymentsRelations,
  activitiesRelations, categoriesRelations, budgetsRelations
} from './schema';

const client = createClient({
  url: process.env.DATABASE_URL || 'file:./sqlite.db',
});

const schema = {
  users, groups, groupMembers, expenses, expenseParticipants,
  payments, activities, categories, budgets,
  usersRelations, groupsRelations, groupMembersRelations,
  expensesRelations, expenseParticipantsRelations, paymentsRelations,
  activitiesRelations, categoriesRelations, budgetsRelations
};

export const db = drizzle(client, { schema });
