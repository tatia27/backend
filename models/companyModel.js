import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
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
    accessToken: {
      type:String,
      default: null,
    }
  },
  {
    versionKey: false,
  },
);

export default mongoose.model("companies", companySchema);
