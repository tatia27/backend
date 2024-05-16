import Internship from "../models/internshipModel.js";
import mongoose from "mongoose";


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
    const companyId = req.params;
    const companyObjectId = new mongoose.Types.ObjectId(companyId);

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
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};


export const getInternships = async (req, res, next) => { 
  try { 
    const limit = 6; 

    const internships = await Internship.find(
      {
        salary: { $ne: null }, 
        typeOfEmployment: "Partial", 
        isActive: true
      },
      "_id"
    ).limit(limit);
    
    const internshipIds = internships.map(internship => String(internship._id));
    res.status(200).json(internshipIds); 
  } catch (err) { 
    next(err); 
  } 
}; 

export const getInternshipsForCompany = async (req, res, next) => {
  try {
    const internshipsForComapny = await Internship.find({
      companyId: req.params.id,
      isActive: true,
    });
    res.status(200).json(internshipsForComapny);
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
    res.status(200).json(internshipsForIntern);
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
    res.status(200).json(inactiveInternship);
  } catch (err) {
    next(err);
  }
};

export const applyForInternship = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const idInternship = req.params.id;
    const { id } = req.body;
    const userObjectId = new mongoose.Types.ObjectId(id);


    console.log(idInternship,id )
    const existingInternship = await Internship.findOne({
      _id: idInternship,
      participants: userObjectId,
    });

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (existingInternship) {
      return res
        .status(400)
        .json({ message: "You have already applied for this internship." });
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      idInternship,
      { $push: { participants: userObjectId } },
      { new: true },
    );

    res.status(200).json(updatedInternship);
  } catch (err) {
    next(err);
  }
};

export const participantsOfInternship = async (req, res, next) => {
  try {
    const { id } = req.params;
    const internshipObjectId = new mongoose.Types.ObjectId(id);
    const internship = await Internship.findOne({ _id: internshipObjectId });

    res.status(200).json(internship.participants);
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
