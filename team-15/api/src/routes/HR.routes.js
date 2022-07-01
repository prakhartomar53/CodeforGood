const express = require("express");
const jwt = require("../middleware/hr.middleware");
const router = express.Router();
const Controller = require("../controllers/HR.controller");

router.post("/sign-in", Controller.SignIn);
router.post("/sign-up", Controller.SignUp);

//protected routes
router.post("/add-employee", jwt, Controller.AddEmployee);

router.get("/check-employee-details", jwt, Controller.CheckEmployeeDetails);

router.get("/get-all-employees", Controller.GetAllEmployees);

router.get("/get-roles", Controller.GetRoles);

router.post("/add-course", jwt, Controller.AddCourse);

module.exports = router;
