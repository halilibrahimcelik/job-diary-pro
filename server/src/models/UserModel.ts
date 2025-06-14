import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: 'admin' | 'user';
}
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = model<IUser>('User', UserSchema);
