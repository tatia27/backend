import jwt from "jsonwebtoken";

export const generateToken = (res, statusCode, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(statusCode).cookie("token", token, {
    httpOnly: true,
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
