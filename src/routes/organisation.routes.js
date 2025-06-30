/** @format */

import express from "express";
import { addOrganisation } from "../controllers/organisation.controller.js";

const router = express.Router();

router.post("/", addOrganisation);

export default router;
