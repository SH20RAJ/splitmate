import { Schema, model, Document, Types } from 'mongoose';

export interface IPayment extends Document {
  groupId: Types.ObjectId;
  fromUserId: Types.ObjectId;
  toUserId: Types.ObjectId;
  amount: number;
  currency: string;
  description?: string;
  method: 'cash' | 'upi' | 'bank_transfer' | 'card' | 'other';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  group?: Types.ObjectId;
  fromUser?: Types.ObjectId;
  toUser?: Types.ObjectId;
}

const PaymentSchema = new Schema<IPayment>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
    description: {
      type: String,
      trim: true,
    },
    method: {
      type: String,
      enum: ['cash', 'upi', 'bank_transfer', 'card', 'other'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      trim: true,
    },
    paymentDate: {
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
PaymentSchema.index({ groupId: 1 });
PaymentSchema.index({ fromUserId: 1 });
PaymentSchema.index({ toUserId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ paymentDate: 1 });

// Virtual populate
PaymentSchema.virtual('group', {
  ref: 'Group',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
});

PaymentSchema.virtual('fromUser', {
  ref: 'User',
  localField: 'fromUserId',
  foreignField: '_id',
  justOne: true,
});

PaymentSchema.virtual('toUser', {
  ref: 'User',
  localField: 'toUserId',
  foreignField: '_id',
  justOne: true,
});

// Ensure virtual fields are serialized
PaymentSchema.set('toJSON', {
  virtuals: true,
});

export default model<IPayment>('Payment', PaymentSchema);