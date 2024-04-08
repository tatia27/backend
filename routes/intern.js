import express from "express";
const router = express.Router();

import {
  register,
  getIntern,
  getInterns,
  updateInternProfile,
  createResume,
} from "../controllers/internController.js";

// /v1/intern GET
router.get("/", getInterns);

// /v1/intern  POST - to register a company
router.post("/", register);

// v1/intern/{intern_id} GET
router.get("/:id", getIntern);

// /v1/intern/{intern_id} PUT
router.patch("/:id", updateInternProfile);

router.patch("/:id/resume", createResume);

export default router;
