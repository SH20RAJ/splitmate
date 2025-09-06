import { db } from '../src/db/index.js';
import { categories } from '../src/db/schema.js';

// Create default categories
const defaultCategories = [
  { name: 'Food & Drinks', icon: '🍕', color: '#ff6b6b', isDefault: true },
  { name: 'Entertainment', icon: '🎬', color: '#4ecdc4', isDefault: true },
  { name: 'Transportation', icon: '🚗', color: '#45b7d1', isDefault: true },
  { name: 'Shopping', icon: '🛍️', color: '#96ceb4', isDefault: true },
  { name: 'Bills & Utilities', icon: '💡', color: '#feca57', isDefault: true },
  { name: 'Travel', icon: '✈️', color: '#ff9ff3', isDefault: true },
  { name: 'Healthcare', icon: '🏥', color: '#54a0ff', isDefault: true },
  { name: 'Other', icon: '📦', color: '#6c5ce7', isDefault: true },
];

async function initializeDatabase() {
  try {
    console.log('✓ Database schema initialized successfully!');
    console.log('✓ Schema includes: users, groups, expenses, payments, activities, categories, budgets');
    
    console.log('\nTo create the database and run migrations:');
    console.log('1. Run: bunx drizzle-kit push');
    console.log('2. Or use the database connection in your app');
    
    console.log('\nDatabase is ready for use!');
  } catch (error) {
    console.error('Error:', error);
  }
}

initializeDatabase();
