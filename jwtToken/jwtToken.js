import jwt from "jsonwebtoken";

export const generateToken = (user, statusCode, res, userId, message) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "100d",
  });
  // res.status(statusCode).cookie("token", token, {
  //   httpOnly: true,
  //   sameSite: "strict", // Prevent CSRF attacks
  //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  // });

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
