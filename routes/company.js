import express from "express";
import {
  register,
  getCompany,
  updateCompany,
  getUsersForInternship,
} from "../controllers/companyController.js";
import { checkCompanyAuth, verifyToken, checkAuth} from "../middlewares/checkAuth.js";

const router = express.Router();

// public
router.post("/", register);
router.get("/:id/one",   getCompany);
// router.get("/:id/one",  checkAuth, verifyToken, getCompany);

// company only
router.patch("/:id", checkCompanyAuth, verifyToken, updateCompany);
router.get("/interns", checkCompanyAuth, verifyToken, getUsersForInternship);

export default router;
