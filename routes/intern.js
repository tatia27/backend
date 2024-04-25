import express from "express";
const router = express.Router();

import {
  register,
  getIntern,
  getInterns,
  updateInternProfile,
  createResume,
  addToFavoritesInternship,
  getFavoritesInternship,
  getInternForCompany
} from "../controllers/internController.js";


router.get("/", getInterns);
router.post("/", register);
router.get("/:id", getIntern);
router.get("/:id/apply-to-internship", getInternForCompany);
router.get("/:id/favorites", getFavoritesInternship);
router.put("/:id/resume", createResume);
router.patch('/:id/add-to-favorites', addToFavoritesInternship);

export default router;
