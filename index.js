import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import company from "./routes/company.js";
import intern from "./routes/intern.js";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const app = express();

config({ path: "./config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/v1/company", company);
app.use("/v1/intern", intern);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`App listening on port ${process.env.PORT}`);
});
