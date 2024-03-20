import express from "express";
const router = express.Router();

import { login } from "../controllers/authorizationController.js";

// /v1/authorization POST
router.get("/", login);

export default router;
