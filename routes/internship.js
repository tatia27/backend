import express from "express";
const router = express.Router();

import {
  createCompany,
  getInternship,
  getInternships,
} from "../controllers/internshipController.js";

router.get("/", getInternships);
router.post("/", createCompany);
router.get("/:id", getInternship);

export default router;
