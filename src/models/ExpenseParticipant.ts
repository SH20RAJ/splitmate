import { Schema, model, Document, Types } from 'mongoose';

export interface IExpenseParticipant extends Document {
  expenseId: Types.ObjectId;
  userId: Types.ObjectId;
  shareAmount: number;
  sharePercentage?: number;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  expense?: Types.ObjectId;
  user?: Types.ObjectId;
}

const ExpenseParticipantSchema = new Schema<IExpenseParticipant>(
  {
    expenseId: {
      type: Schema.Types.ObjectId,
      ref: 'Expense',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shareAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    sharePercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ExpenseParticipantSchema.index({ expenseId: 1, userId: 1 }, { unique: true });
ExpenseParticipantSchema.index({ expenseId: 1 });
ExpenseParticipantSchema.index({ userId: 1 });
ExpenseParticipantSchema.index({ isPaid: 1 });

// Virtual populate
ExpenseParticipantSchema.virtual('expense', {
  ref: 'Expense',
  localField: 'expenseId',
  foreignField: '_id',
  justOne: true,
});

ExpenseParticipantSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Ensure virtual fields are serialized
ExpenseParticipantSchema.set('toJSON', {
  virtuals: true,
});

export default model<IExpenseParticipant>('ExpenseParticipant', ExpenseParticipantSchema);