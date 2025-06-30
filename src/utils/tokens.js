/** @format */

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      organisationId: user.organisationId,
    },
    JWT_SECRET
  );
};

export const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tokenWithoutBearer = token.split(" ")[1];
    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
