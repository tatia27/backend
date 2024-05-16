import Intern from "../models/internModel.js";
import Company from "../models/companyModel.js";
import { generateToken } from "../jwtToken/jwtToken.js";
import bcrypt from "bcrypt";
import {ERRORS} from "../constants/errors.js"
import { HTTP_CODES } from "../constants/errors.js";

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
    return res.status(ERRORS.USER_NOT_FOUND.CODE).json({ error: ERRORS.USER_NOT_FOUND.TITLE });
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

export const isAuth = async (req, res) => {
  const decoded = req.sessionData; // jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role === "intern") {
    const intern = await Intern.findOne({ _id: decoded.userId });
    if (intern) {
      return res.status(HTTP_CODES.SUCCESS).json({ role: intern.role, id: intern._id });
    }
    return  res.status(ERRORS.USER_NOT_FOUND.CODE).json({ message: ERRORS.USER_NOT_FOUND.TITLE});

  }
 
  if (decoded.role === "company") {
    const company = await Company.findOne({ _id: decoded.userId });
    if (company) {
      return res.status(HTTP_CODES.SUCCESS).json({ role: company.role, id: company._id });
    }
    return  res.status(ERRORS.COMPANY_NOT_FOUND.CODE).json({ message: ERRORS.COMPANY_NOT_FOUND.TITLE});
  }
  
  return  res.status(ERRORS.NOT_AUTHORIZED.CODE).json({ message: ERRORS.NOT_AUTHORIZED.TITLE});
 
};
