const multer = require("multer");
const express = require("express");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});
const Controller = require("../controllers/Application.controller");
const router = express.Router();
const hrJwt = require("../middleware/hr.middleware");

router.post("/upload-application", upload.single("file"), Controller.AddReport);
router.get("/get-application-details", Controller.GetApplicationDetails);

router.post("/reject-application", hrJwt, Controller.RejectApplication);
router.post("/accept-application", hrJwt, Controller.AcceptApplication);

router.get(
  "/get-all-applications-for-role",
  hrJwt,
  Controller.GetAllApplicationsForRole
);

router.get("/get-all-applications", Controller.GetAllApplications);

module.exports = router;
