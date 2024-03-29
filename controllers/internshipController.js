import Internship from "../models/internshipModel.js";

export const createCompany = async (req, res, next) => {
  const newComapny = new Internship(req.body);

  try {
    const savedCompany = await newComapny.save();
    res.status(200).json(savedCompany);
  } catch (err) {
    next(err);
  }
};

export const getInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);
    res.status(200).json(internship);
  } catch (err) {
    next(err);
  }
};

export const getInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (err) {
    next(err);
  }
};
