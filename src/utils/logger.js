/** @format */

import { createLogger, format, transports } from "winston";

// Configure the logger
const logger = createLogger({
  level: "info", // Default logging level
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamp
    format.json() // Log in JSON format for easier parsing
  ),
  transports: [
    // Write logs to a file
    new transports.File({ filename: "logs/error.log", level: "error" }), // Error logs
    new transports.File({ filename: "logs/combined.log" }), // All logs
  ],
});

// In development, also log to console for easier debugging
if (process.env.NODE_ENV !== "PROD") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorize logs for console
        format.simple() // Simple format for console
      ),
    })
  );
}

export default logger;
