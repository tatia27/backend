import express from "express";
const router = express.Router();

import {
  createIntership,
  getInternship,
  getInternships,
} from "../controllers/internshipController.js";

router.get("/", getInternships);
router.post("/", createIntership);
router.get("/:id", getInternship);

export default router;
