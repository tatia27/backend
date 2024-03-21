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
      return res.status(400).json({ error: "Incorrect password" });
    }

    generateToken(res, 201, company._id);

    res.json({
      _id: company._id,
      name: company.name,
      email: company.email,
    });
  } else if (intern) {
    const isInternPasswordCorrect = await isPasswordCorrect(intern, password);
    if (!isInternPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    generateToken(res, intern._id);

    res.json({
      _id: intern._id,
      firstName: intern.firstName,
      senondName: intern.secondName,
      lastName: intern.lastName,
      email: intern.email,
    });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
};

// export const logout = async (req, res) => {
//   res
//     .status(201)
//     .cookie("token", "", {
//       httpOnly: true,
//       expires: new Date(Date.now()),
//     })
//     .json({
//       success: true,
//       message: "Logged Out Successfully.",
//     });
// };

// export const isAuthenticated = async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return res.status(401).json({ message: "User Not Authorized" });
//   }
//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   req.user = await User.findById(decoded.id);

//   next();
// };
