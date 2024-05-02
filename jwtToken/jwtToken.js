import jwt from "jsonwebtoken";

export const generateToken = (user, statusCode, res, userId, role, message) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "100d",
  });

  res.status(statusCode).json({
    success: true,
    user,
    message,
    token,
  });
};
