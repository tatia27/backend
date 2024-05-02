import express from "express";

import {
  register,
  getCompany,
  getCompanies,
  updateCompany,
  getUsersForInternship,
} from "../controllers/companyController.js";

const router = express.Router();

// /v1/companies - get all companies
router.get("/", getCompanies);
router.post("/", register);
router.get("/:id", getCompany);
router.patch("/:id", updateCompany);
router.get("/interns", getUsersForInternship);

export default router;
