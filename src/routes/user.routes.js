/** @format */

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addUsers } from "../controllers/user.controllers.js";
import { adminMiddleware } from "../utils/tokens.js";

const router = express.Router();

router.post("/add-user", adminMiddleware, addUsers);

export default router;
