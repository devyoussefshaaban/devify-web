import jwt from "jsonwebtoken";

const generateToken = (id: string): any => {
  jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export default generateToken;
