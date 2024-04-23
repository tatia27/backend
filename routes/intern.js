import express from "express";
const router = express.Router();

import {
  register,
  getIntern,
  getInterns,
  updateInternProfile,
  createResume,
  addToFavorites
} from "../controllers/internController.js";


router.get("/", getInterns);
router.post("/", register);
router.get("/:id", getIntern);
router.put("/:id/resume", createResume);
router.post('/:id/add-to-favorites', addToFavorites);

export default router;
