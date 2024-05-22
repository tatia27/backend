import Intern from "../models/internModel.js";
import Company from "../models/companyModel.js";
import { generateToken } from "../jwtToken/jwtToken.js";
import {ERRORS} from "../constants/errors.js"
import { HTTP_CODES } from "../constants/errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isPasswordCorrect = async (user, password) => {
  const isCorrect = await bcrypt.compare(password, user.passwordHash);
  return isCorrect;
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(ERRORS.BAD_REQUEST.CODE).json({ error: "Please fill full form!" });
  }

  const intern = await Intern.findOne({ email });
  const company = await Company.findOne({ email });

  if (company) {
    const isCompanyPasswordCorrect = await isPasswordCorrect(company, password);

    if (!isCompanyPasswordCorrect) {
      return res.status(ERRORS.WRONG_DATA.CODE).json({ message: ERRORS.WRONG_DATA.TITLE });
    }

    generateToken(
      company,
      res,
      company._id,
      company.role,
      "User Loged in!",
    );
  } else if (intern) {
    const isInternPasswordCorrect = await isPasswordCorrect(intern, password);

    if (!isInternPasswordCorrect) {
      return res.status(ERRORS.WRONG_DATA.CODE).json({ message: ERRORS.WRONG_DATA.TITLE });
    }

    if (!intern.accessToken) {
      let token = generateToken( intern._id, intern.role);
      await Intern.findByIdAndUpdate(
        intern._id,
        { $set: { accessToken: token } },
         {
          new: true,
          useFindAndModify: false,
        },
      );
       return  res.status(HTTP_CODES.CREATED).json({
          success: true,
          token,
         }
        );
    }

    return res.status(HTTP_CODES.SUCCESS).json({
      success: true,
      token: intern.accessToken
    });
  } else {
    return res.status(ERRORS.USER_NOT_FOUND.CODE).json({ error: ERRORS.USER_NOT_FOUND.TITLE });
  }
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

export const logout = async (req, res) => {
  // const authHeader = req.headers.authorization || "";
  // const token = authHeader.split(" ")[1];
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(req.sessionData.userId);
  // const intern = await Intern.findOne({ _id: req.sessionData.userId });
  await Intern.findByIdAndUpdate(
     req.sessionData.userId,
    { $set: { accessToken: null } },
     {
      new: true,
      useFindAndModify: false,
    },
  );
  res
    .status(201)
    .json({
      message: "Logged Out Successfully.",
    });
};
