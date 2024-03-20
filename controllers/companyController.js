import Company from "../models/companyModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill full form!" });
    }
    const isEmail = await Company.findOne({ email });
    if (isEmail) {
      return res.status(400).json({ error: "Email already registered!" });
    }
    const company = await Company.create({
      name,
      email,
      passwordHash: hash,
    });

    res.status(200).json(company);
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

export const getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    next(err);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    next(err);
  }
};

export const updateCompany = async (req, res, next) => {
  const { name, description } = req.body;
  const updateFields = {};
  if (name) updateFields.name = name;
  if (description) updateFields.description = description;
  try {
    const updateCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.status(200).json(updateCompany);
  } catch (err) {
    next(err);
  }
};
