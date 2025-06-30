/** @format */

import nodemailer from "nodemailer";
import logger from "./logger.js";
import dotenv from "dotenv";
dotenv.config();

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send user credentials email
export const sendUserCredentialsEmail = async (
  to,
  userName,
  password,
  organisationName
) => {
  try {
    const mailOptions = {
      from: `"${organisationName} Team" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Your ${organisationName} Account Credentials`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1a202c; font-size: 24px; font-weight: 700; text-align: center; margin-bottom: 16px;">
            Welcome, ${userName}!
          </h2>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            We're excited to have you on board at ${organisationName}. Your account has been created, and below are your login credentials:
          </p>
          <div style="background-color: #f7fafc; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #2d3748; font-size: 16px; margin: 0;">
              <strong>Email:</strong> ${to}
            </p>
            <p style="color: #2d3748; font-size: 16px; margin: 8px 0 0;">
              <strong>Password:</strong> ${password}
            </p>
          </div>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            For security, please log in and change your password immediately. You can access your account at:
            <a href="https://app.${organisationName.toLowerCase()}.com" style="color: #3182ce; text-decoration: none; font-weight: 600;">User Portal</a>
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="https://app.${organisationName.toLowerCase()}.com" style="background-color: #3182ce; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 600;">
              Log In Now
            </a>
          </div>
          <p style="color: #718096; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
            If you need help or have questions, contact our support team at 
            <a href="mailto:support@${organisationName.toLowerCase()}.com" style="color: #3182ce; text-decoration: none;">support@${organisationName.toLowerCase()}.com</a>.
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          <p style="color: #a0aec0; font-size: 12px; text-align: center;">
            This is an automated email, please do not reply directly.<br>
            © ${new Date().getFullYear()} ${organisationName}. All rights reserved.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`User credentials email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(
      `Failed to send user credentials email to ${to}: ${error.message}`
    );
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Function to send admin credentials email
export const sendAdminCredentialsEmail = async (
  to,
  adminName,
  password,
  organisationName
) => {
  try {
    const mailOptions = {
      from: `"${organisationName} Super Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Your ${organisationName} Admin Account Credentials`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1a202c; font-size: 24px; font-weight: 700; text-align: center; margin-bottom: 16px;">
            Welcome, ${adminName}!
          </h2>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            As the Super Admin of ${organisationName}, I’m excited to inform you that your Admin account has been created for our platform. Below are your credentials to access the admin dashboard:
          </p>
          <div style="background-color: #f7fafc; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #2d3748; font-size: 16px; margin: 0;">
              <strong>Email:</strong> ${to}
            </p>
            <p style="color: #2d3748; font-size: 16px; margin: 8px 0 0;">
              <strong>Password:</strong> ${password}
            </p>
          </div>
          <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            For security, please log in to the admin dashboard and change your password immediately. You can access the dashboard at:
            <a href="https://dashboard.${organisationName.toLowerCase()}.com" style="color: #3182ce; text-decoration: none; font-weight: 600;">Admin Dashboard</a>
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="https://dashboard.${organisationName.toLowerCase()}.com" style="background-color: #3182ce; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 600;">
              Log In Now
            </a>
          </div>
          <p style="color: #718096; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
            If you have any questions or need assistance, please contact our support team at 
            <a href="mailto:support@${organisationName.toLowerCase()}.com" style="color: #3182ce; text-decoration: none;">support@${organisationName.toLowerCase()}.com</a>.
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          <p style="color: #a0aec0; font-size: 12px; text-align: center;">
            This is an automated email, please do not reply directly.<br>
            © ${new Date().getFullYear()} ${organisationName}. All rights reserved.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Admin credentials email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(
      `Failed to send admin credentials email to ${to}: ${error.message}`
    );
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
