/** @format */

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";

export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET);
};
