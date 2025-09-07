import { Schema, model, Document, Types } from 'mongoose';

export interface IGroupMember extends Document {
  groupId: Types.ObjectId;
  userId: Types.ObjectId;
  role: 'admin' | 'member';
  balance: number;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  group?: Types.ObjectId;
  user?: Types.ObjectId;
}

const GroupMemberSchema = new Schema<IGroupMember>(
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
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member',
    },
    balance: {
      type: Number,
      default: 0,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
GroupMemberSchema.index({ groupId: 1, userId: 1 }, { unique: true });
GroupMemberSchema.index({ groupId: 1 });
GroupMemberSchema.index({ userId: 1 });

// Virtual populate
GroupMemberSchema.virtual('group', {
  ref: 'Group',
  localField: 'groupId',
  foreignField: '_id',
  justOne: true,
});

GroupMemberSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Ensure virtual fields are serialized
GroupMemberSchema.set('toJSON', {
  virtuals: true,
});

export default model<IGroupMember>('GroupMember', GroupMemberSchema);