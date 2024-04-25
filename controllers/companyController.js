import Company from "../models/companyModel.js";
import Internship from "../models/internshipModel.js";
import validateMongodbId from "../utils/validateMongoId.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, conditions } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill full form!" });
    }
    if (conditions !== true) {
      return res
        .status(401)
        .json({ error: "Accept the terms of the agreement" });
    }
    const isEmail = await Company.findOne({ email });
    if (isEmail) {
      return res.status(400).json({ error: "Email already registered!" });
    }
    const company = await Company.create({
      name,
      email,
      passwordHash: hash,
      role: "company",
    });

    res.status(200).json(company);
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
  }
};

export const getCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    validateMongodbId(id, res);

    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Not found" });
    }
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
  if (name !== "") updateFields.name = name;
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

export const getUsersForInternship = async (req, res, next) => {
  try {

    const { internshipId } = req.body;
    let internshipObjectId = new mongoose.Types.ObjectId(internshipId);
    const internship = await Internship.findById(internshipObjectId, { participants: 1 });
    if (!internship) {
      return res.status(404).json({ message: "Стажировка не найдена" });
    }
    res.status(200).json(internship.participants);
  } catch (err) {
    next(err);
  }
};
