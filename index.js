/** @format */

import express from "express";
import { PORT } from "./src/constants/constants.js";
import logger from "./src/utils/logger.js";
import connectDB from "./src/config/db.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
import authRoutes from "./src/routes/auth.routes.js";
app.use("/api/auth", authRoutes);
const startServer = async () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

startServer();
