const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Volunteer", "HR", "Engineering", "Marketing"],
  },
  locations: {
    type: [
      {
        location: String,
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  probation: {
    type: Boolean,
    default: true,
  },
  probationEndDate: {
    type: Date,
  },
  probabationReview: {
    type: String,
  },
  courses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Course",
  },
});

EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

EmployeeSchema.methods.MatchPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

EmployeeSchema.methods.GetUserData = async function () {
  const user = this;
  return {
    id: user._id,
    name: user.name,
    password: user.password,
    email: user.email,
    // age: user.age,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    height: user.height,
    weight: user.weight,
    phoneNumber: user.phoneNumber,
    address: user.address,
  };
};

module.exports = mongoose.model("Employee", EmployeeSchema);
