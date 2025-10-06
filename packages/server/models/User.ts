import { UserRole } from "../utils/types";

import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
});

const User = model("User", userSchema);
export default User;
