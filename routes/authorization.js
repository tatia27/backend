import express from "express";
const router = express.Router();

import {
  login,
  logout,
  // isAuthenticated,
} from "../controllers/authorizationController.js";

// /v1/authorization
router.post("/login", login);
// router.get("/logout", logout);

export default router;
