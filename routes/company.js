import express from "express";

import {
  register,
  getCompany,
  getCompanies,
  updateCompany,
} from "../controllers/companyController.js";

const router = express.Router();

// /v1/companies - get all companies
router.get("/", getCompanies);

// /v1/companies POST - to register a company
router.post("/", register);

// v1/companies/id GET
router.get("/:id", getCompany);

// /v1/companies/id PUT
router.patch("/:id", updateCompany);

export default router;
