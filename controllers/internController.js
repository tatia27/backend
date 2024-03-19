import Intern from "../models/internModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { firstName, secondName, lastName, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (!firstName || !secondName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Please fill full form!" });
    }
    const isEmail = await Intern.findOne({ email });
    if (isEmail) {
      return res.status(400).json({ error: "Email already registered!" });
    }

    const intern = await Intern.create({
      firstName,
      secondName,
      lastName,
      email,
      password: hash,
    });

    res.status(200).json(intern);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getIntern = async (req, res, next) => {
  try {
    const intern = await Intern.findById(req.params.id);
    res.status(200).json(intern);
  } catch (err) {
    next(err);
  }
};

export const getInterns = async (req, res, next) => {
  try {
    const interns = await Intern.find();
    res.status(200).json(interns);
  } catch (err) {
    next(err);
  }
};

export const updateIntern = async (req, res, next) => {
  const { firstName, secondName, lastName, description } = req.body;
  const updateFields = {};
  if (firstName) updateFields.firstName = firstName;
  if (secondName) updateFields.secondName = secondName;
  if (lastName) updateFields.lastName = lastName;
  if (description) updateFields.description = description;
  try {
    const updateIntern = await Intern.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    res.status(200).json(updateIntern);
  } catch (err) {
    next(err);
  }
};
