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
  participantsOfInternship,
  getInternshipsForIntern
} from "../controllers/internshipController.js";
import {  checkCompanyAuth, checkInternAuth } from "../middlewares/checkAuth.js";

// public
router.get("/popular", getInternships);
router.get("", getFilteredInternships);
router.get("/:id", getInternship);

// intern only
router.patch("/:id/apply",checkInternAuth, applyForInternship);
router.get("/:id/applications", checkInternAuth, getInternshipsForIntern);

// company only
router.post("/:id", checkCompanyAuth, createIntership);
router.get("/:id/active", checkCompanyAuth, getInternshipsForCompany);
router.patch("/:id/inactive", checkCompanyAuth, setInactiveInternship);
router.get("/:id/participants",checkCompanyAuth, participantsOfInternship);


export default router;
