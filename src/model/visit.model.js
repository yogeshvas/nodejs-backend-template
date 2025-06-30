/** @format */

import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    personToMeet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
    },

    checkInTime: {
      type: Date,
      default: Date.now,
    },
    checkOutTime: {
      type: Date,
    },
    purpose: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Visit = mongoose.model("Visit", visitSchema);
