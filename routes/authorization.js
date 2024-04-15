import express from "express";
const router = express.Router();

import {
  login,
  logout,
  // isAuthenticated,
} from "../controllers/authController.js";

// /v1/authorization
router.post("/login", login);

// router.get("/profile", isAuthenticated);
router.get("/logout", logout);

export default router;
