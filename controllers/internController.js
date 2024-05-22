import Intern from "../models/internModel.js";
import Internship from "../models/internshipModel.js";
import validateMongodbId from "../utils/validateMongoId.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ERRORS, HTTP_CODES } from "../constants/errors.js";


export const register = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, password, conditions } =
      req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!firstName || !middleName || !lastName || !email || !password) {
      return res.status(ERRORS.BAD_REQUEST.CODE).json({ message: ERRORS.BAD_REQUEST.TITLE });
    }
    if (conditions !== true) {
      return res
        .status(ERRORS.BAD_REQUEST.CODE)
        .json({ message: ERRORS.BAD_REQUEST.TITLE });
    }

    const isEmail = await Intern.findOne({ email });

    if (isEmail) {
      return res.status(ERRORS.CONFLICT.CODE).json({ message: ERRORS.CONFLICT.TITLE });
    }

    const intern = await Intern.create({
      firstName,
      middleName,
      lastName,
      email,
      passwordHash: hash,
      role: "intern",
    });

    res.status(HTTP_CODES.SUCCESS).json(intern);
  } catch (err) {
    next(err);
  }
};

export const getIntern = async (req, res, next) => {
  try {
    const { id } = req.params;
 
    validateMongodbId(id, res);

    const intern = await Intern.findById(req.params.id);

    res.status(HTTP_CODES.SUCCESS).json(intern);
  } catch (err) {
    next(err);
  }
};

export const getInternForCompany = async (req, res, next) => {
  try {
    const { id } = req.params;

    validateMongodbId(id, res);

    const intern = await Intern.findById(req.params.id);

    res
      .status(HTTP_CODES.SUCCESS)
      .json({ firstName: intern.firstName, lastName: intern.lastName });
  } catch (err) {
    next(err);
  }
};

export const getInterns = async ( res, next) => {
  try {
    const interns = await Intern.find();

    res.status(HTTP_CODES.SUCCESS).json(interns);
  } catch (err) {
    next(err);
  }
};

export const updateInternProfile = async (req, res, next) => {
  try {
  const { firstName, secondName, lastName, description } = req.body;
  const updateFields = {};

  if (firstName) updateFields.firstName = firstName;
  if (secondName) updateFields.secondName = secondName;
  if (lastName) updateFields.lastName = lastName;
  if (description) updateFields.description = description;

  
    const updateIntern = await Intern.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: updateFields },
      { new: true },
    );
    res.status(HTTP_CODES.SUCCESS).json(updateIntern);
  } catch (err) {
    next(err);
  }
};

export const createResume = async (req, res, next) => {
  try {
    const {
      age,
      location,
      levelOfEducation,
      educationalInstitution,
      specialization,
      hardSkills,
      softSkills,
    } = req.body;
    const { id } = req.params;
    
    const updateFields = {};
    if (age !== undefined) updateFields["cv.age"] = age;
    if (location) updateFields["cv.location"] = location;
    if (levelOfEducation)
      updateFields["cv.levelOfEducation"] = levelOfEducation;
    if (educationalInstitution)
      updateFields["cv.educationalInstitution"] = educationalInstitution;
    if (location) updateFields["cv.specialization"] = specialization;
    if (hardSkills) updateFields["cv.hardSkills"] = hardSkills;
    if (softSkills) updateFields["cv.softSkills"] = softSkills;

    const updateIntern = await Intern.findByIdAndUpdate(
      id,
      { $set: updateFields },
      {
        new: true,
        useFindAndModify: false,
      },
    );

    res.status(HTTP_CODES.SUCCESS).json(updateIntern);
  } catch (err) {
    next(err);
  }
};

export const addToFavoritesInternship = async (req, res, next) => {
  try {
    const idInternship = req.params.id;
    const { id } = req.body;
    const internshipObjectId = new mongoose.Types.ObjectId(idInternship);

    const existingInternship = await Intern.findOne({
      _id: id,
      favorites: internshipObjectId,
    });

    if (existingInternship) {
      return res
        .status(ERRORS.BAD_REQUEST.CODE)
        .json({ message: ERRORS.BAD_REQUEST.TITLE });
    }

    const updatedInternship = await Intern.findByIdAndUpdate(
      id,
      { $push: { favorites: internshipObjectId } },
      { new: true },
    );

    res.status(HTTP_CODES.SUCCESS).json(updatedInternship);
  } catch (err) {
    next(err);
  }
};

export const removeFromFavoritesInternship = async (req, res, next) => {
  try {
    const internshipId = req.params.id;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const internshipObjectId = new mongoose.Types.ObjectId(internshipId);
    const userObjectId = new mongoose.Types.ObjectId(decoded.userId);

    const existingInternship = await Intern.findOneAndUpdate(
      { _id: userObjectId, favorites: internshipObjectId },
      { $pull: { favorites: internshipObjectId } },
    );

   
    if (!existingInternship) {
      return res.status(ERRORS.INTERNSHIP_NOT_FOUND.CODE).json({ message: ERRORS.INTERNSHIP_NOT_FOUND.TITLE });
    }

    res.status(HTTP_CODES.SUCCESS).json({ message: "Internship removed from favorites." });
  } catch (err) {
    next(err);
  }
};

export const getFavoritesInternships = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await Intern.findById(id);

    if (!user) {
      return res.status(ERRORS.INTERN_NOT_FOUND.CODE).json({ message: ERRORS.INTERN_NOT_FOUND.TITLE });
    }
    
    const favorites = await Internship.find({_id: {$in: user.favorites}});

    res.status(HTTP_CODES.SUCCESS).json( favorites );
  } catch (err) {
    next(err);
  }
};
