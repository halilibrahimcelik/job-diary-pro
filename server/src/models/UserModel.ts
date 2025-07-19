import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  image: string | undefined;
  role: 'admin' | 'user' | 'tester';
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
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'tester'],
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
