import { ObjectId } from "mongoose";

export interface AppError extends Error {
  statusCode?: number;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface UserDto {
  username: string;
  email: string;
  role: UserRole;
  joinedAt: string;
  avatarUrl: string;
  bio: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
  };
  token: string;
}

export interface User extends UserDto {
  _id: any;
  password: string;
}
