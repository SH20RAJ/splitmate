import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  icon?: string;
  color: string;
  isDefault: boolean;
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
    isDefault: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
CategorySchema.index({ name: 1 });
CategorySchema.index({ isDefault: 1 });

export default model<ICategory>('Category', CategorySchema);