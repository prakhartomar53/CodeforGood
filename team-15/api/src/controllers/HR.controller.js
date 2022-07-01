const HRModel = require("../models/hr.model.js");
const EmployeeModel = require("../models/Employee/employee.model");
const goalModel = require("../models/Employee/goal.model.js");

const jwt = require("jsonwebtoken");
const applicationModel = require("../models/Application/application.model.js");
const courseModel = require("../models/course.model.js");

exports.GetAllEmployees = async (req, res) => {
  const list = await EmployeeModel.find({});
  return res.status(200).json(list);
};

exports.SignIn = async (req, res) => {
  try {
    console.log("called");
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(500).json({
        success: false,
        message: "Required values not provided!",
      });
    let HASH = process.env.JWT_HASH;
    const employee = await HRModel.findOne({
      email,
    });
    if (employee) {
      const check = await employee.MatchPassword(password);

      if (!check) {
        console.log("Error");

        return res.status(500).json({
          success: false,
          message: "Unknown server error!",
        });
      }

      if (!HASH) {
        throw new Error("Hash not provided!");
      }
      const userData = await employee.GetUserData();
      const token = jwt.sign(
        {
          userData,
        },
        HASH,
        {
          expiresIn: "10h",
        }
      );
      return res.status(200).json({
        success: true,
        token,
        userData: userData,
        type: "HR",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Username does not exist!",
      });
    }
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
    });
  }
};

exports.GetRoles = async (req, res) => {
  try {
    let data = {};
    const employees = await EmployeeModel.find({});
    const applications = await applicationModel.find({});
    for (let employee of employees) {
      if (data[employee.role]) {
        if (employee.probation) {
          data[employee.role].probation++;
        } else {
          data[employee.role].employees++;
        }
      } else {
        data[employee.role] = {};
        if (employee.probation) {
          data[employee.role].probation = 1;
        } else {
          data[employee.role].employees = 1;
        }
      }
    }
    for (let employee of applications) {
      if (data[employee.role]) {
        if (data[employee.role].applicants) data[employee.role].applicants++;
        else data[employee.role].applicants = 1;
      } else {
        data[employee.role] = {};
        data[employee.role].applicants = 1;
      }
    }
    return res.status(200).json(data);
  } catch (err) {
    console.log("ERROR");
  }
};

exports.SignUp = async (req, res) => {
  try {
    await HRModel.create(req.body);
    return res.status(200).json({
      success: true,
      message: "HR Created",
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
    });
  }
};

exports.CheckEmployeeDetails = async (req, res) => {
  try {
    const { employee } = req.query;
    const details = await EmployeeModel.findById(employee);
    const goalsCompleted = await goalModel.find({
      employeeId: employee,
    });
    return res.status(200).json({
      details,
      goalsCompleted,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.AddEmployee = async (req, res) => {
  try {
    await EmployeeModel.create(req.body);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.AddCourse = async (req, res) => {
  try {
    await courseModel.create(req.body);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};
