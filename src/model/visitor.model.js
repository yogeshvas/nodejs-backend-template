/** @format */

import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  employeeId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Visitor = mongoose.model("Visitor", visitorSchema);
