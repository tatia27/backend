import express from "express";
const router = express.Router();

import {
  createIntership,
  getInternship,
  getInternships,
  getFilteredInternships,
  getInternshipsForCompany,
  setInactiveInternship,
  applyForInternship,
  participantsOfInternship
} from "../controllers/internshipController.js";

router.get("", getFilteredInternships);
router.get("/popular", getInternships);
router.post("/:id", createIntership);
router.get("/:id", getInternship);
router.get("/:id/active", getInternshipsForCompany);
router.patch("/:id/inactive", setInactiveInternship);
router.patch("/:id/apply", applyForInternship);
router.get("/:id/participants", participantsOfInternship);

export default router;
