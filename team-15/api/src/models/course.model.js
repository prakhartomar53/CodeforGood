const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  assignedTo: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  links: {
    type: [String],
    default: [],
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
