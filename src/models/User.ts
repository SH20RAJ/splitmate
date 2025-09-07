import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  // Virtual fields
  groups?: Types.ObjectId[];
  expenses?: Types.ObjectId[];
  payments?: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
UserSchema.index({ email: 1 });

// Virtual populate
UserSchema.virtual('groups', {
  ref: 'GroupMember',
  localField: '_id',
  foreignField: 'userId',
});

UserSchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'paidById',
});

UserSchema.virtual('payments', {
  ref: 'Payment',
  localField: '_id',
  foreignField: 'fromUserId',
});

// Ensure virtual fields are serialized
UserSchema.set('toJSON', {
  virtuals: true,
});

export default model<IUser>('User', UserSchema);