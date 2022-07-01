const mongoose = require("mongoose");

const EmployeeGoalSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  referenceCourse: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  timeline: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("EmployeeGoal", EmployeeGoalSchema);
