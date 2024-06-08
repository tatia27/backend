import mongoose from "mongoose";

const internSchema = new mongoose.Schema(
  {
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
    },
    role: {
      type: String,
      required: true,
      enum: ["intern", "company"],
    },
    description: String,
    favorites: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    cv: {
      age: {
        type: Number,
        default: null,
      },
      location: {
        type: String,
      },
      levelOfEducation: {
        type: String,
      },
      educationalInstitution: {
        type: String,
      },
      specialization: {
        type: String,
      },
      hardSkills: {
        type: String,
      },
      softSkills: {
        type: String,
      },
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model("interns", internSchema);
