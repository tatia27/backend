import Intern from "../models/internModel.js";
import Company from "../models/companyModel.js";
import { generateToken } from "../jwtToken/jwtToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const isPasswordCorrect = async (user, password) => {
  const isCorrect = await bcrypt.compare(password, user.passwordHash);
  return isCorrect;
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill full form!" });
  }

  const intern = await Intern.findOne({ email });
  const company = await Company.findOne({ email });

  if (company) {
    const isCompanyPasswordCorrect = await isPasswordCorrect(company, password);
    if (!isCompanyPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    generateToken(
      company,
      201,
      res,
      company._id,
      company.role,
      "User Loged in!",
    );
  } else if (intern) {
    const isInternPasswordCorrect = await isPasswordCorrect(intern, password);
    if (!isInternPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    generateToken(intern, 201, res, intern._id, intern.role, "User Loged in!");
  } else {
    return res.status(404).json({ error: "User not found" });
  }
};

export const logout = async (req, res) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
};

export const isAuthenticated = async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ message: "User Not Authorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "User Not Authorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  const intern = await Intern.findOne({ _id: decoded.userId });
  if (intern) {
    return res.status(200).json({ role: intern.role, id: intern._id });
  }

  const company = await Company.findOne({ _id: decoded.userId });
  if (company) {
    return res.status(200).json({ role: company.role, id: company._id });
  }

  return res.status(404).json({ message: "User not found" });
};
