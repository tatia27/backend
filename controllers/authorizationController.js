import Intern from "../models/internModel.js";
import Company from "../models/companyModel.js";
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
    console.log(isCompanyPasswordCorrect);
    if (!isCompanyPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    return res.status(200).json({ company });
  } else if (intern) {
    const isInternPasswordCorrect = await isPasswordCorrect(intern, password);
    if (!isInternPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    return res.status(200).json({ intern });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

// export const logout = async (req, res, next) => {
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
