const express = require("express");
const hrJwt = require("../middleware/hr.middleware");
const router = express.Router();
const Controller = require("../controllers/Appointment.controller");

router.post("/cancel-appointment", hrJwt, Controller.CancelAppointment);
router.post("/schedule-appointment", hrJwt, Controller.ScheduleAppointment);
router.get("/get-upcoming", hrJwt, Controller.GetAllUpcomingAppointments);
module.exports = router;
