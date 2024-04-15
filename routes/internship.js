import express from "express";
const router = express.Router();

import {
  createIntership,
  getInternship,
  getInternships,
  getFilteredInternships,
  getInternshipsForCompany,
} from "../controllers/internshipController.js";

router.get("", getFilteredInternships);
router.get("/popular", getInternships);
router.post("/", createIntership);
router.get("/:id", getInternship);
router.get("/:id/active", getInternshipsForCompany);

export default router;
