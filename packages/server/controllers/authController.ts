import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { AppError, User as IUser } from "../utils/types";
import { toUserDto } from "../dtos/userDto";
import { generateEmailVerification, sendMail } from "../utils/sendEmail";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400);
      throw new Error("Incorrect password");
    }

    user.token = generateToken(user._id.toString());
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: toUserDto(user as unknown as IUser),
    });
  } catch (error) {
    const err = error as AppError;
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username is required" });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password || password.trim() === "") {
      return res.status(400).json({ message: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await generateEmailVerification(user);

    user.token = generateToken(user._id.toString());

    await user.save();

    res.status(201).json({
      success: true,
      message: "Successfully registered",
      data: toUserDto(user as unknown as IUser),
    });
  } catch (error) {
    const err = error as AppError;
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    res
      .status(200)
      .json({ success: true, data: toUserDto(user as unknown as IUser) });
  } catch (error) {
    const err = error as AppError;
    res
      .status(err?.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

export { loginUser, registerUser, getMe };
