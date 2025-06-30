/** @format */

import { Organisation } from "../model/organisation.model.js";
import { User } from "../model/user.model.js";
import { generatePassword } from "../utils/misc.js";
import { z } from "zod";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import { sendAdminCredentialsEmail } from "../utils/email.js";

export const addOrganisation = async (req, res) => {
  try {
    const { organisationName, userName, email } = req.body;

    // Check for duplicate organisation name
    const existingOrganisation = await Organisation.findOne({
      name: organisationName,
    });
    if (existingOrganisation) {
      return res
        .status(409)
        .json({ success: false, message: "Organisation name already exists" });
    }

    // Check for duplicate user email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User email already registered" });
    }

    // Generate a 6-digit random password
    const password = generatePassword();

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create organisation and user in a transaction-like manner
    const organisation = await Organisation.create({ name: organisationName });
    logger.info(organisation);
    const user = await User.create({
      name: userName,
      email,
      password: hashedPassword,
      organisationId: organisation._id,
      designation: "Admin", // Default designation for the first user
      role: "admin", // Default role for the first user
    });
    sendAdminCredentialsEmail(email, userName, password, organisationName);

    // Verify that both records were created successfully
    if (!organisation || !user) {
      // Rollback: delete created organisation if user creation failed
      if (organisation) {
        await Organisation.deleteOne({ _id: organisation._id });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to create organisation or user",
      });
    }

    res.status(201).json({
      success: true,
      data: { organisation, user, password }, // Note: Consider removing password from response in production
      message: "Organisation created successfully",
    });
  } catch (error) {
    // Handle Zod validation errors from the model
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    // Handle specific database errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: `Validation error: ${error.message}`,
      });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Duplicate key error: organisation name or email already exists",
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};
