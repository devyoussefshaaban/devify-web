import { Document, HydratedDocument } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: Document<any, any, any> | null;
    }
  }
}

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
  joinedAt: Date;
  avatarUrl: string;
  bio: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
  };
  token: string;
  isVerified: boolean;
}

export interface User extends UserDto {
  _id: any;
  password: string;
  emailVerification: {
    token: string;
    expiresIn: number;
  };
}
