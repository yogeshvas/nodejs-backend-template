/** @format */

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenWithoutBearer = token.split(" ")[1];
  const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);
  req.user = decoded;
  next();
};
