import mongoose from "mongoose";
import Internship from "../models/internshipModel.js";
import {  HTTP_CODES, ERRORS } from "../constants/errors.js";
import { internships } from "../internships.js";

export const createIntership = async (req, res) => {
  try {
    const {
      title,
      company,
      focusOfInternship,
      schedule,
      typeOfEmployment,
      durationOfInternship,
      salary,
      skills,
      conditions,
    } = req.body;
    const companyId = req.params.id;
    const companyObjectId = new mongoose.Types.ObjectId(companyId);

    if (!title || !company || !durationOfInternship || salary < 0 || !conditions || !skills) {
      return res.status(ERRORS.BAD_REQUEST.CODE).json(ERRORS.BAD_REQUEST.TITLE);
    }

    const newInternship = await Internship.create({
      title,
      company,
      focusOfInternship,
      schedule,
      typeOfEmployment,
      durationOfInternship,
      salary,
      skills,
      conditions,
      isActive: true,
      companyId: companyObjectId,
    });


     res.status(HTTP_CODES.SUCCESS).json(newInternship);
  } catch (err) {
    next(err);
  }
};

export const getInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);

    res.status(HTTP_CODES.SUCCESS).json(internship);
  } catch (err) {
    next(err);
  }
};

export const getFilteredInternships = async (req, res, next) => {
  try {
    let { page, focusOfInternship, schedule, typeOfEmployment, salary } =
      req.query;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (parseInt(page) - 1) * limit;
    let filter = { isActive: true };

    if (focusOfInternship) {
      focusOfInternship = focusOfInternship.split(",");
      filter.focusOfInternship = { $in: focusOfInternship };
    }
    if (schedule) {
      schedule = schedule.split(",");
      filter.schedule = { $in: schedule };
    }
    if (typeOfEmployment) {
      typeOfEmployment = typeOfEmployment.split(",");
      filter.typeOfEmployment = { $in: typeOfEmployment };
    }
    if (salary) {
      salary = salary.split(",");
      if (salary.includes("paid")) {
        filter.salary = { $ne: null };
      } else if (salary.includes("unpaid")) {
        filter.salary = { $eq: null };
      } else {
        filter.salary = { $in: salary };
      }
    }

    const internships = await Internship.find(filter).skip(skip).limit(limit);

    const totalInternships = await Internship.countDocuments(filter);
    const numberOfPages = Math.ceil(totalInternships / limit);

    const response = { internships, numberOfPages };
    res.status(HTTP_CODES.SUCCESS).json(response);
  } catch (err) {
    next(err);
  }
};


export const getNewPopularInternships = async (req, res, next) => { 
  try { 
    const limit = 6; 

    const internships = await Internship.find(
      {
        salary: { $ne: null }, 
        typeOfEmployment: "Partial", 
        isActive: true
      },
    ).limit(limit);
    
    res.status(HTTP_CODES.SUCCESS).json(internships); 
  } catch (err) { 
    next(err); 
  } 
}; 

export const getInternshipsForCompany = async (req, res, next) => {
  try {
    const internshipObjectId = new mongoose.Types.ObjectId(req.params.id);

    const internshipsForComapny = await Internship.find({
      companyId: internshipObjectId,
      isActive: true,
    });

    res.status(HTTP_CODES.SUCCESS).json(internshipsForComapny);
  } catch (err) {
    next(err);
  }
};

export const getInternshipsForIntern = async (req, res, next) => {
  try {
    const internshipsForIntern = await Internship.find({
      participants: req.params.id,
      isActive: true,
    });
    
    res.status(HTTP_CODES.SUCCESS).json(internshipsForIntern);
  } catch (err) {
    next(err);
  }
};

export const setInactiveInternship = async (req, res, next) => {
  try {
    const inactiveInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );

    res.status(HTTP_CODES.SUCCESS).json(inactiveInternship);
  } catch (err) {
    next(err);
  }
};

export const applyForInternship = async (req, res, next) => {
  try {
    const idInternship = req.params.id;
    const { id } = req.body;
    const userObjectId = new mongoose.Types.ObjectId(id);

    const existingInternship = await Internship.findOne({
      _id: idInternship,
      participants: userObjectId,
    });


    if (existingInternship) {
      return res
        .status(ERRORS.BAD_REQUEST.CODE)
        .json({ message: ERRORS.BAD_REQUEST.TITLE });
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      idInternship,
      { $push: { participants: userObjectId } },
      { new: true },
    );

    res.status(HTTP_CODES.SUCCESS).json(updatedInternship);
  } catch (err) {
    next(err);
  }
};

export const participantsOfInternship = async (req, res, next) => {
  try {
    const { id } = req.params;
    const internshipObjectId = new mongoose.Types.ObjectId(id);
    const internship = await Internship.findOne({ _id: internshipObjectId });

    res.status(HTTP_CODES.SUCCESS).json(internship.participants);
  } catch (err) {
    next(err);
  }
};


// Заполнение коллекции internships стажировками из файла internship.js
// const insertInternships = async () => {
//   try {
//     const internship = await Internship.insertMany(internships);
//     return Promise.resolve(internship);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// insertInternships()
//   .then((internships) => console.log(internships))
//   .catch((err) => console.log(err));
