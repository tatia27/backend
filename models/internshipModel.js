import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  focusOfInternship: {
    type: String,
    required: true,
    enum: [
      "Frontend developer",
      "Backend developer",
      "Mobile developer",
      "System administrator",
      "Game developer",
      "Teaster",
      "Analyst",
      "Designer",
      "Manager",
      "Recruiter",
      "Other",
    ],
  },
  schedule: {
    type: String,
    required: true,
    enum: ["Office", "Remotely"],
  },
  typeOfEmployment: {
    type: String,
    required: true,
    enum: ["Full", "Partial"],
  },
  durationOfInternship: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    default: null,
  },
  skills: {
    type: String,
    required: true,
  },
  conditions: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
});

export default mongoose.model("internship", internshipSchema);
