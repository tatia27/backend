import Internship from "../models/internshipModel.js";
// import internships from "../config/internship.json" assert { type: "json" };

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

export const getInternships = async (req, res, next) => {
  try {
    let { page, focusOfInternship, schedule, typeOfEmployment, salary } =
      req.query;
    const ITEM_PAGE = 4;
    const skip = (parseInt(page) - 1) * ITEM_PAGE;

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
    if (salary !== undefined) {
      filter.salary = { $ne: null };
    }

    const internships = await Internship.find(filter)
      .skip(skip)
      .limit(ITEM_PAGE);

    const total = await Internship.countDocuments(filter);
    const numberOfPages = Math.ceil(total / ITEM_PAGE);

    const response = { internships, total, numberOfPages };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
