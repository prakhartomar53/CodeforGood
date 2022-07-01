const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
  },
  hr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HR",
  },
  dateAndTime: {
    type: Date,
  },
  status: {
    type: String,
    default: "UPCOMING",
    enum: ["ATTENDED", "NOT_ATTENDED", "UPCOMING", "CANCELLED"],
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
