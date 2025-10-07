import { UserRole } from "../utils/types";
import { User as IUser } from "../utils/types";

import { HydratedDocument, Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  avatarUrl: { type: String },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  },
  bio: { type: String },
  socialLinks: {
    github: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
  },
  token: { type: String },
  emailVerification: {
    token: String,
    expriresIn: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export type UserDocument = HydratedDocument<IUser>;
const User = model<IUser>("User", userSchema);
export default User;
