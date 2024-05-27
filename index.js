import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import company from "./routes/company.js";
import intern from "./routes/intern.js";
import internship from "./routes/internship.js";
import authorization from "./routes/authorization.js";
import { connect } from "./database/database.js";
import cors from "cors";
import {checkCompanyAuth } from "./middlewares/checkAuth.js"

export const app = express();

config({ path: "./config/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Some middleware logic
  next();
});

//routes
app.use("/v1/company",  company);
app.use("/v1/intern", intern);
app.use("/v1/auth", authorization);
app.use("/v1/internships", internship);

app.listen(process.env.PORT, () => {
  connect();
  // console.log(`App listening on port ${process.env.PORT}`);
});
