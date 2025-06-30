/** @format */

import mongoose from "mongoose";
import { z } from "zod";

// Define Zod schema for Organisation validation
const organisationSchemaZod = z.object({
  name: z
    .string()
    .min(2, "Organisation name must be at least 2 characters")
    .max(100, "Organisation name must not exceed 100 characters"),
});

// Mongoose schema
const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

// Pre-save middleware to validate data using Zod
organisationSchema.pre("save", async function (next) {
  try {
    await organisationSchemaZod.parseAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

export const Organisation = mongoose.model("Organisation", organisationSchema);
