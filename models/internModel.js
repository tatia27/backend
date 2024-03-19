import mongoose from "mongoose";

// firstName, secondName, lastName, email, password, description
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
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  description: String,
});

export default mongoose.model("interns", internSchema);
