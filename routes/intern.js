import express from "express";
const router = express.Router();

import {
  register,
  getIntern,
  updateIntern,
  createResume,
  addToFavoritesInternship,
  getFavoritesInternships,
  getInternForCompany,
  removeFromFavoritesInternship,
} from "../controllers/internController.js";
import {
  checkAuth,
  checkInternAuth,
  verifyToken,
} from "../middlewares/checkAuth.js";

// public
router.post("/", register);

// authorized
router.get("/:id/one", checkAuth, verifyToken, getIntern);

// intern only
router.put("/:id/resume", checkInternAuth, verifyToken, createResume);
router.patch("/:id/update-intern", checkInternAuth, verifyToken, updateIntern);
router.get(
  "/:id/favorites",
  checkInternAuth,
  verifyToken,
  getFavoritesInternships,
);
router.get(
  "/:id/apply-to-internship",
  checkInternAuth,
  verifyToken,
  getInternForCompany,
);
router.patch(
  "/:id/add-to-favorites",
  checkInternAuth,
  verifyToken,
  addToFavoritesInternship,
);
router.patch(
  "/:id/remove-from-favorites",
  checkInternAuth,
  verifyToken,
  removeFromFavoritesInternship,
);

export default router;
