import { Schema, model, Document, Types } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description?: string;
  currency: string;
  category: string;
  monthlyBudget?: number;
  status: 'active' | 'settled' | 'archived';
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  members?: Types.ObjectId[];
  expenses?: Types.ObjectId[];
  payments?: Types.ObjectId[];
}

const GroupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      required: true,
      default: '₹',
    },
    category: {
      type: String,
      required: true,
      default: 'General',
    },
    monthlyBudget: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['active', 'settled', 'archived'],
      default: 'active',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
GroupSchema.index({ createdBy: 1 });
GroupSchema.index({ status: 1 });

// Virtual populate
GroupSchema.virtual('members', {
  ref: 'GroupMember',
  localField: '_id',
  foreignField: 'groupId',
});

GroupSchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'groupId',
});

GroupSchema.virtual('payments', {
  ref: 'Payment',
  localField: '_id',
  foreignField: 'groupId',
});

// Ensure virtual fields are serialized
GroupSchema.set('toJSON', {
  virtuals: true,
});

export default model<IGroup>('Group', GroupSchema);