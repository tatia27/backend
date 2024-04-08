import mongoose from "mongoose";

// firstName, middleName, lastName, email, password,  role, description, favorites
const internSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ["Intern", "Company"],
  },
  description: String,
  favorites: {
    type: [],
  },
  cv: {
    age: {
      type: Number,
      default: null,
    },
    location: String,
    levelOfEducation: String,
    educationalInstitution: String,
    hardSkills: String,
    softSkills: String,
  },
});

export default mongoose.model("interns", internSchema);
