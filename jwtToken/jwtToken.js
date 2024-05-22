import jwt from "jsonwebtoken";
import { HTTP_CODES } from "../constants/errors.js";

export const generateToken = (userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "100d",
  });

  // res.status(HTTP_CODES.CREATED).json({
  //   success: true,
  //   user,
  //   message,
  //   token,
  // }
  // );
  return token;
};
