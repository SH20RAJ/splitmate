import { Schema, model, Document, Types } from 'mongoose';

export interface IExpense extends Document {
  groupId: Types.ObjectId;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  category: string;
  paidById: Types.ObjectId;
  receiptUrl?: string;
  splitType: 'equal' | 'percentage' | 'amount' | 'custom';
  status: 'pending' | 'processing' | 'settled';
  expenseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  group?: Types.ObjectId;
  paidBy?: Types.ObjectId;
  participants?: Types.ObjectId[];
}

const ExpenseSchema = new Schema<IExpense>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: '₹',
    },
    category: {
      type: String,
      required: true,
      default: 'Other',
    },
    paidById: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiptUrl: {
      type: String,
      trim: true,
    },
    splitType: {
      type: String,
      enum: ['equal', 'percentage', 'amount', 'custom'],
      default: 'equal',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'settled'],
      default: 'pending',
    },
    expenseDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ExpenseSchema.index({ groupId: 1 });
ExpenseSchema.index({ paidById: 1 });
ExpenseSchema.index({ status: 1 });
ExpenseSchema.index({ category: 1 });
ExpenseSchema.index({ expenseDate: 1 });

// Virtual populate
ExpenseSchema.virtual('group', {
  ref: 'Group',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
});

ExpenseSchema.virtual('paidBy', {
  ref: 'User',
  localField: 'paidById',
  foreignField: '_id',
  justOne: true,
});

ExpenseSchema.virtual('participants', {
  ref: 'ExpenseParticipant',
  localField: '_id',
  foreignField: 'expenseId',
});

// Ensure virtual fields are serialized
ExpenseSchema.set('toJSON', {
  virtuals: true,
});

export default model<IExpense>('Expense', ExpenseSchema);