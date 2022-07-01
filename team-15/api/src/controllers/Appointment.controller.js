const AppointmentSchema = require("../models/appointment.model");

exports.CancelAppointment = async (req, res) => {
  try {
    const { uid } = res.locals;
    const { appointment } = req.body;
    await AppointmentSchema.findOne(
      {
        _id: appointment,
        hr: uid,
      },
      {
        status: "CANCELLED",
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

exports.ScheduleAppointment = async (req, res) => {
  try {
    const { uid } = res.locals;
    await AppointmentSchema.create({
      hr: uid,
      ...req.body,
    });
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

exports.GetAllUpcomingAppointments = async (req, res) => {
  try {
    const { uid } = res.locals;
    const appointments = await AppointmentSchema.find({
      dateAndTime: {
        $gte: Date.now(),
      },
      hr: uid,
    }).populate(["applicant"]);
    return res.status(200).json(appointments);
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
