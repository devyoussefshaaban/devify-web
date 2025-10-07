import { User, UserDto } from "../utils/types";

export const toUserDto = (user: User): UserDto => {
  const {
    username,
    email,
    role,
    joinedAt,
    avatarUrl,
    bio,
    socialLinks,
    token,
    isVerified,
  } = user;

  return {
    username,
    email,
    role,
    joinedAt,
    avatarUrl,
    bio,
    socialLinks,
    token,
    isVerified,
  };
};
