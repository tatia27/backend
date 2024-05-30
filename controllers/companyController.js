import Company from "../models/companyModel.js";
import Internship from "../models/internshipModel.js";
import validateMongodbId from "../utils/validateMongoId.js";
import { ERRORS, HTTP_CODES } from "../constants/errors.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, conditions } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!name || !email || password.length < 8) {
      return res.status(ERRORS.BAD_REQUEST.CODE).json({ message: ERRORS.BAD_REQUEST.TITLE});
    }
    if (conditions !== true) {
      return res.status(ERRORS.BAD_REQUEST.CODE).json({ message: ERRORS.BAD_REQUEST.TITLE});
    }
  
    
    const isEmail = await Company.findOne({ email });
    if (isEmail) {
      return res.status(ERRORS.BAD_REQUEST.CODE).json({ message: ERRORS.BAD_REQUEST.TITLE });
    }
    const company = await Company.create({
      name,
      email,
      passwordHash: hash,
      role: "company",
    });

    res.status(HTTP_CODES.SUCCESS).json(company);
  } catch (err) {
    next(err);
  }
};

export const getCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    validateMongodbId(id, res);

    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(ERRORS.COMPANY_NOT_FOUND.CODE).json({ message: ERRORS.COMPANY_NOT_FOUND.TITLE });
    }
    res.status(HTTP_CODES.SUCCESS).json(company);
  } catch (err) {
    next(err);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
  const { name, description } = req.body;
  const updateFields = {};

  if (name) updateFields.name = name;
  if (description) updateFields.description = description;

    const updateCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true },
    );
    res.status(HTTP_CODES.SUCCESS).json(updateCompany);
  } catch (err) {
    next(err);
  }
};

export const getUsersForInternship = async (req, res, next) => {
  try {
    const { internshipId } = req.body;
    let internshipObjectId = new mongoose.Types.ObjectId(internshipId);

    const internship = await Internship.findById(internshipObjectId, {
      participants: 1,
    });
    if (!internship) {
      return res.status(ERRORS.INTERNSHIP_NOT_FOUND.CODE).json({ message: ERRORS.INTERNSHIP_NOT_FOUND.TITLE });
    }

    res.status(HTTP_CODES.SUCCESS).json(internship.participants);
  } catch (err) {
    next(err);
  }
};