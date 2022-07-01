const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Volunteer", "HR", "Engineering", "Marketing"],
  },
  reason: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },
  metadata: {
    type: {
      secretKey: {
        type: String,
        required: true,
      },
      hash: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  status: {
    type: String,
    default: "ONGOING",
    enum: ["REJECTED", "ONGOING", "ACCEPTED"],
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
