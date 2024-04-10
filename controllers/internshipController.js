import Internship from "../models/internshipModel.js";
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
    });

    // const { role } = req.user;
    // if (role === "Intern") {
    //   return res
    //     .status(403)
    //     .json({ error: "Intern not allowed to access this resource" });
    // }

    res.status(200).json(newInternship);
  } catch (err) {
    return res.status(400).json({ error: "Server Error" });
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

export const getFilteredInternships = async (req, res, next) => {
  try {
    let { page, focusOfInternship, schedule, typeOfEmployment, salary } =
      req.query;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (parseInt(page) - 1) * limit;

    let filter = {};
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

    const total = await Internship.countDocuments(filter);
    const numberOfPages = Math.ceil(total / limit);

    const response = { internships, total, numberOfPages };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const getInternships = async (req, res) => {
  try {
    const limit = 6;
    const internship = await Internship.find({
      salary: { $ne: null },
      typeOfEmployment: "Partial",
    }).limit(limit);
    res.status(200).json(internship);
  } catch (err) {
    next(err);
  }
};

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
