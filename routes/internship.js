import express from "express";
const router = express.Router();

import {
  createIntership,
  getInternship,
  getInternships,
  getFilteredInternships,
} from "../controllers/internshipController.js";

router.get("", getFilteredInternships);
router.get("/popular", getInternships);
router.post("/", createIntership);
router.get("/:id", getInternship);

export default router;
