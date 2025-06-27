/** @format */

import { User } from "../model/user.model.js";
import logger from "../utils/logger.js";
import { generateToken } from "../utils/tokens.js";

export const auth = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
      });
    }
    const response_user = await User.findById(user._id);
    const token = generateToken(response_user);
    return res.status(200).json({
      success: true,
      user: response_user,
      token,
    });
  } catch (error) {
    logger.error("Error in auth controller:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
