import express from "express";
const router = express.Router();
import {
  createIntership,
  getInternship,
  getFilteredInternships,
  getNewPopularInternships,
  getInternshipsForCompany,
  setInactiveInternship,
  applyForInternship,
  participantsOfInternship,
  getInternshipsForIntern
} from "../controllers/internshipController.js";
import {  checkCompanyAuth, checkInternAuth, verifyToken } from "../middlewares/checkAuth.js";

// public
router.get("", getFilteredInternships);
router.get("/new-popular", getNewPopularInternships);
router.get("/:id", getInternship);

// intern only
router.patch("/:id/apply",checkInternAuth, verifyToken, applyForInternship);
router.get("/:id/applications", checkInternAuth, verifyToken, getInternshipsForIntern);

// company only
router.post("/:id", checkCompanyAuth, verifyToken, createIntership);
router.get("/:id/active", checkCompanyAuth, verifyToken, getInternshipsForCompany);
router.patch("/:id/inactive", checkCompanyAuth, verifyToken, setInactiveInternship);
router.get("/:id/participants",checkCompanyAuth, verifyToken, participantsOfInternship);


export default router;
