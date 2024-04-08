import Internship from "../models/internshipModel.js";

export const createIntership = async (req, res) => {
  // const newInternship = new Internship(req.body);
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
    const { page, focusOfInternship, schedule, typeOfEmployment, salary } =
      req.query;
    const ITEM_PAGE = 4;
    const skip = (parseInt(page) - 1) * ITEM_PAGE;

    let filter = {};
    if (focusOfInternship) {
      filter.focusOfInternship = focusOfInternship;
    }
    if (schedule) {
      filter.schedule = schedule;
    }
    if (typeOfEmployment) {
      filter.typeOfEmployment = typeOfEmployment;
    }
    if (salary !== undefined) {
      filter.salary = { $ne: null };
    }

    console.log(filter);

    const internships = await Internship.find(filter)
      .skip(skip)
      .limit(ITEM_PAGE);

    const total = await Internship.countDocuments();

    const response = { internships, total };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
