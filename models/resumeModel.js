import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  levelOfEducation: {
    type: String,
    required: true,
    enum: ["Bachelor", "Master", "Specialist"],
  },
  educationalInstitution: {
    type: String,
    required: true,
  },
  hardSkills: {
    type: String,
    required: true,
  },
  softSkills: {
    type: String,
    required: true,
  },
});

export default mongoose.model("internship", resumeSchema);
