/** @format */

import mongoose from "mongoose";
import { z } from "zod";

// Define Zod schema for Admin validation
const adminSchemaZod = z.object({
  role: z.enum(["admin", "superadmin"]).default("admin"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string().email("Invalid email format"),
});

// Mongoose schema
const adminSchema = new mongoose.Schema({
  // role: {
  //   type: String,
  //   enum: ["admin", "superadmin"],
  //   default: "admin",
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  organisationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
  },
});

// Pre-save middleware to validate data using Zod
adminSchema.pre("save", async function (next) {
  try {
    await adminSchemaZod.parseAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

export const Admin = mongoose.model("Admin", adminSchema);
