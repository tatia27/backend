import mongoose from "mongoose";

// firstName, secondName, lastName, email, password, conditions, role, description, favorites
const internSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
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
});

export default mongoose.model("interns", internSchema);
