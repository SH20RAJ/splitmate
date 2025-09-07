import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  groupId: Types.ObjectId;
  userId: Types.ObjectId;
  type: 'expense_added' | 'expense_updated' | 'expense_deleted' | 'payment_made' | 'member_added' | 'member_removed' | 'group_created' | 'group_updated' | 'group_settled';
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  group?: Types.ObjectId;
  user?: Types.ObjectId;
}

const ActivitySchema = new Schema<IActivity>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'expense_added',
        'expense_updated',
        'expense_deleted',
        'payment_made',
        'member_added',
        'member_removed',
        'group_created',
        'group_updated',
        'group_settled'
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ActivitySchema.index({ groupId: 1 });
ActivitySchema.index({ userId: 1 });
ActivitySchema.index({ type: 1 });
ActivitySchema.index({ createdAt: -1 });

// Virtual populate
ActivitySchema.virtual('group', {
  ref: 'Group',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
});

ActivitySchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Ensure virtual fields are serialized
ActivitySchema.set('toJSON', {
  virtuals: true,
});

export default model<IActivity>('Activity', ActivitySchema);