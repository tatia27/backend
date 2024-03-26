import mongoose from "mongoose";

// name, email, password, conditions,role, photo, description
const companySchema = new mongoose.Schema({
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
    minlength: 8,
  },
  conditions: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Intern", "Company"],
  },
  photo: String,
  description: String,
});

export default mongoose.model("companies", companySchema);
