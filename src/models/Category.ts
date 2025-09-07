import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  icon?: string;
  color: string;
  description?: string;
  keywords?: string[];
  parentCategory?: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      default: '#6366f1',
    },
    description: {
      type: String,
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    parentCategory: {
      type: String,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
CategorySchema.index({ name: 1 });
CategorySchema.index({ isDefault: 1 });
CategorySchema.index({ isActive: 1 });
CategorySchema.index({ parentCategory: 1 });
CategorySchema.index({ keywords: 1 });

export default model<ICategory>('Category', CategorySchema);