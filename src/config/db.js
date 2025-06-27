/** @format */

import mongoose from "mongoose";
import { MONGO_URI } from "../constants/constants.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    // TODO: Put this to .env
    const conn = await mongoose.connect(MONGO_URI);
    logger.info(
      `MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`
    );
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
