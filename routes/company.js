import express from "express";
import {
  register,
  getCompany,
  updateCompany,
  getUsersForInternship,
} from "../controllers/companyController.js";
import { checkCompanyAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

// public
router.post("/", register);

// company only
router.get("/:id", checkCompanyAuth, getCompany);
router.patch("/:id", checkCompanyAuth, updateCompany);
router.get("/interns", checkCompanyAuth, getUsersForInternship);

export default router;
