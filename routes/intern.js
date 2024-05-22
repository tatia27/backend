import express from "express";
const router = express.Router();

import {
  register,
  getIntern,
  updateInternProfile,
  createResume,
  addToFavoritesInternship,
  getFavoritesInternships,
  getInternForCompany,
  removeFromFavoritesInternship
} from "../controllers/internController.js";
import {checkAuth, checkInternAuth, verifyToken} from "../middlewares/checkAuth.js";

// public  
router.post("/", register);

// authorized
router.get("/:id/one",   checkAuth, verifyToken,  getIntern);

// intern only
router.put("/:id/resume",   checkInternAuth,  createResume);
router.get("/:id/favorites", checkInternAuth,  getFavoritesInternships);
router.get("/:id/apply-to-internship", checkInternAuth,  getInternForCompany);
router.patch("/:id/add-to-favorites", checkInternAuth, addToFavoritesInternship);
router.patch("/:id/remove-from-favorites", checkInternAuth,  removeFromFavoritesInternship);

export default router;
