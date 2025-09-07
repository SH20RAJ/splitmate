import { Schema, model, Document, Types } from 'mongoose';

export interface IBudget extends Document {
  groupId: Types.ObjectId;
  categoryId?: Types.ObjectId;
  name: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  group?: Types.ObjectId;
  category?: Types.ObjectId;
}

const BudgetSchema = new Schema<IBudget>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'yearly'],
      default: 'monthly',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
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
BudgetSchema.index({ groupId: 1 });
BudgetSchema.index({ categoryId: 1 });
BudgetSchema.index({ isActive: 1 });
BudgetSchema.index({ startDate: 1 });
BudgetSchema.index({ endDate: 1 });

// Virtual populate
BudgetSchema.virtual('group', {
  ref: 'Group',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
});

BudgetSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

// Ensure virtual fields are serialized
BudgetSchema.set('toJSON', {
  virtuals: true,
});

export default model<IBudget>('Budget', BudgetSchema);