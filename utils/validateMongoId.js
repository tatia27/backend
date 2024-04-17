import mongoose from "mongoose";

const validateMongoDbId = (id, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return res
      .status(404)
      .json({ message: "This id is not valid or not Found" });
  }
};

export default validateMongoDbId;
