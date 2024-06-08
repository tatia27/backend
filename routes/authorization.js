import express from "express";
const router = express.Router();

import { login, logout, isAuth } from "../controllers/authController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

router.post("/login", login);

router.post("/logout", checkAuth, logout);

router.get("/isAuth", checkAuth, isAuth);

export default router;
