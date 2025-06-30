/** @format */

import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { Organisation } from "../model/organisation.model.js";
import { sendUserCredentialsEmail } from "../utils/email.js";
import { generatePassword } from "../utils/misc.js";

export const addUsers = async (req, res) => {
  try {
    const { organisationId } = req.user;
    const { name, email, designation, role } = req.body;

    // Validate required fields
    if (!name || !email || !designation || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Validate role
    const validRoles = ["manager", "employee", "guard"];
    if (!validRoles.includes(role)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role specified" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already registered" });
    }

    // Generate and hash password
    const password = generatePassword();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Get organisation details for email
    const organisation = await Organisation.findById(organisationId);
    if (!organisation) {
      return res
        .status(404)
        .json({ success: false, message: "Organisation not found" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      designation,
      role,
      organisationId,
    });

    // Send credentials email
    await sendUserCredentialsEmail(email, name, password, organisation.name);

    return res.status(201).json({
      success: true,
      message: "User created successfully. Credentials sent to email.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        designation: user.designation,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create user: ${error.message}`,
    });
  }
};
