import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const headerAuth = req.headers.authorization;
  let token;

  if (headerAuth && headerAuth.startsWith("Bearer")) {
    try {
      token = headerAuth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      let userId: string | undefined;
      if (typeof decoded === "string") {
        userId = undefined;
      } else {
        userId = (decoded as { userId?: string }).userId;
      }

      if (!userId) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      const user = await User.findById(userId);

      req.user = user;

      next();
    } catch (error) {
      res.status(403);
      throw new Error("Not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { auth };
