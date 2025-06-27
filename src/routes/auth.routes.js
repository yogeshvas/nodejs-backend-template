/** @format */

import express from "express";
import { auth } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/", auth);

export default router;
