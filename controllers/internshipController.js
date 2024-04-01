import Internship from "../models/internshipModel.js";

export const createIntership = async (req, res, next) => {
  const newInternship = new Internship(req.body);

  // const { role } = req.user;
  // if (role === "Intern") {
  //   return res
  //     .status(403)
  //     .json({ error: "Intern not allowed to access this resource" });
  // }

  try {
    const savedIntership = await newInternship.save();
    res.status(200).json(savedIntership);
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
