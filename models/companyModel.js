import mongoose from "mongoose";

// name, email, password, photo, description
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
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  photo: String,
  description: String,
});

export default mongoose.model("companies", companySchema);
