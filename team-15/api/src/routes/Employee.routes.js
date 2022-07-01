const express = require("express");
const Controller = require("../controllers/Employee.controller");
const jwt = require("../middleware/employee.middleware");
const hrJwt = require("../middleware/hr.middleware");
const router = express.Router();

router.post("/sign-in", Controller.SignIn);
router.get("/get-dashboard-details", Controller.GetDashboardDetails);

router.post("/add-course", jwt, Controller.AddCourse);
router.post("/add-goal", jwt, Controller.AddGoal);
router.get("/get-employee-details", hrJwt, Controller.GetEmployeeDetails);
router.get("/get-probated", Controller.GetEmployeesUnderProbation);

router.get("/get-all-courses", Controller.GetAllCourses);

router.post("/change-location", jwt, Controller.ChangeLocation);

module.exports = router;
