const EmployeeModel = require("../models/Employee/employee.model");
const GoalModel = require("../models/Employee/goal.model");
const CourseModel = require("../models/course.model");
const jwt = require("jsonwebtoken");
const courseModel = require("../models/course.model");
const goalModel = require("../models/Employee/goal.model");

exports.GetEmployeesUnderProbation = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({ probation: true });
    return res.status(200).json(employees);
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
};

exports.AddGoal = async (req, res) => {
  try {
    await goalModel.create({ ...req.body, employeeId: res.locals.uid });
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
};
exports.AddCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const { uid } = res.locals;
    console.log(uid);
    const check = await CourseModel.findById(course);
    if (!check)
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    await EmployeeModel.findOneAndUpdate(
      {
        _id: uid,
      },
      {
        $push: {
          courses: course,
        },
      }
    );

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
exports.GetEmployeeDetails = async (req, res) => {
  try {
    const { employee } = req.query;
    const details = await EmployeeModel.findById(employee);
    const goals = await GoalModel.find({
      employeeId: employee,
    }).populate(["referenceCourse"]);

    return res.status(200).json({ ...details, goals });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
    });
  }
};

exports.GetDashboardDetails = async (req, res) => {
  try {
    const { employee } = req.query;
    const details = await EmployeeModel.findById(employee).populate("courses");
    const goalsCompleteWithoutCourse = await GoalModel.find({
      employeeId: employee,
      referenceCourse: [],
    }).countDocuments();
    const goalsCompleteWithCourse =
      (await GoalModel.find({
        employeeId: employee,
      }).countDocuments()) - goalsCompleteWithoutCourse;

    const coursesAssigned = await courseModel.find({
      assignedTo: {
        $in: [details.role],
      },
    });
    const coursesCompleted =
      coursesAssigned === 0
        ? 0
        : details.courses.length / coursesAssigned.length;
    console.log(coursesAssigned);

    return res.status(200).json({
      ...details._doc,
      goalsCompleteWithCourse,
      goalsCompleteWithoutCourse,
      coursesCompleted,
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

exports.SignIn = async (req, res) => {
  try {
    console.log("called");
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Required values not provided!",
      });
    let HASH = process.env.JWT_HASH;
    const employee = await EmployeeModel.findOne({
      email,
    });
    if (employee) {
      const check = await employee.MatchPassword(password);

      if (!check) {
        console.log("Error");

        return res.status(400).json({
          success: false,
          message: "Wrong password",
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
        type: "EMPLOYEE",
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

exports.ChangeLocation = async (req, res) => {
  try {
    await EmployeeModel.findOneAndUpdate(
      { _id: res.locals.uid },
      {
        $push: {
          locations: { location: req.body.location },
        },
      }
    );
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

exports.GetAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    return res.status(200).json(courses);
  } catch (err) {
    console.log("EERRO");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
