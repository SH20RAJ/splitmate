import { db } from '@/db';
import { categories, NewCategory } from '@/db/schema';
import { eq, like, and, inArray } from 'drizzle-orm';

export class CategoryDrizzleService {
  // Create a new category
  static async createCategory(categoryData: NewCategory) {
    try {
      const [category] = await db.insert(categories).values(categoryData).returning();
      return category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Get category by ID
  static async getCategoryById(id: string) {
    try {
      const category = await db.query.categories.findFirst({
        where: eq(categories.id, id)
      });
      
      if (!category) {
        throw new Error('Category not found');
      }
      
      return category;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }

  // Get all categories
  static async getAllCategories() {
    try {
      const categoriesList = await db.select().from(categories);
      return categoriesList;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Get default categories
  static async getDefaultCategories() {
    try {
      const defaultCategories = await db.select().from(categories).where(eq(categories.isDefault, true));
      return defaultCategories;
    } catch (error) {
      console.error('Error fetching default categories:', error);
      throw error;
    }
  }

  // Update category
  static async updateCategory(id: string, updateData: Partial<NewCategory>) {
    try {
      const [updatedCategory] = await db.update(categories)
        .set(updateData)
        .where(eq(categories.id, id))
        .returning();
      
      if (!updatedCategory) {
        throw new Error('Category not found');
      }
      
      return updatedCategory;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  // Delete category
  static async deleteCategory(id: string) {
    try {
      const result = await db.delete(categories).where(eq(categories.id, id));
      
      if (result.rowsAffected === 0) {
        throw new Error('Category not found');
      }
      
      return { message: 'Category deleted successfully' };
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  // Get category by name
  static async getCategoryByName(name: string) {
    try {
      const category = await db.query.categories.findFirst({
        where: like(categories.name, name)
      });
      
      return category;
    } catch (error) {
      console.error('Error fetching category by name:', error);
      throw error;
    }
  }

  // Seed default categories
  static async seedDefaultCategories() {
    try {
      const defaultCategories: NewCategory[] = [
        { name: 'Food & Dining', icon: '🍽️', color: '#FF6B6B', isDefault: true },
        { name: 'Transportation', icon: '🚗', color: '#4ECDC4', isDefault: true },
        { name: 'Shopping', icon: '🛍️', color: '#45B7D1', isDefault: true },
        { name: 'Entertainment', icon: '🎮', color: '#96CEB4', isDefault: true },
        { name: 'Utilities', icon: '💡', color: '#FFEAA7', isDefault: true },
        { name: 'Healthcare', icon: '🏥', color: '#DDA0DD', isDefault: true },
        { name: 'Travel', icon: '✈️', color: '#98D8C8', isDefault: true },
        { name: 'Education', icon: '📚', color: '#F7DC6F', isDefault: true },
        { name: 'Gifts & Donations', icon: '🎁', color: '#BB8FCE', isDefault: true },
        { name: 'Personal Care', icon: '💅', color: '#F8C471', isDefault: true },
        { name: 'Investments', icon: '📈', color: '#82E0AA', isDefault: true },
        { name: 'Other', icon: '📦', color: '#D5D8DC', isDefault: true }
      ];

      // Check if categories already exist
      const existingCategories = await db.select().from(categories).where(eq(categories.isDefault, true));
      
      if (existingCategories.length === 0) {
        await db.insert(categories).values(defaultCategories);
        return { message: 'Default categories seeded successfully' };
      }
      
      return { message: 'Default categories already exist' };
    } catch (error) {
      console.error('Error seeding default categories:', error);
      throw error;
    }
  }

  // Delete multiple categories
 static async deleteCategories(ids: string[]) {
    try {
      // Don't allow deletion of default categories
      const result = await db.delete(categories)
        .where(
          and(
            eq(categories.isDefault, false),
            inArray(categories.id, ids)
          )
        );
      
      return result.rowsAffected;
    } catch (error) {
      console.error('Error deleting categories:', error);
      throw error;
    }
  }
}