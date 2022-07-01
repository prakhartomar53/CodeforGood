const CronJob = require("cron").CronJob;
const EmployeeModel = require("./models/Employee/employee.model");

exports.CollaborativeFilteringRequest = async () => {
  const job = new CronJob(
    //every week
    "0 0 * * *",
    async function () {
      await EmployeeModel.updateMany(
        {
          probationEndDate: {
            $lte: Date.now(),
          },
          probation: true,
        },
        {
          probation: false,
        }
      );
    },
    null,
    true,
    "Asia/Kolkata"
  );
  job.start();
  console.log("Event Review Email Sending Cron Job Started");
};

exports.EventReviewEmailSendingJob = async () => {
  const job = new CronJob(
    "0 0 * * *",
    async function () {
      //events that are done two days before
      const events = await EventModel.find({
        dateAndTime: {
          $lte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        mailsSent: false,
      });
      for (let event of events) {
        const tickets = await TicketModel.find({
          event: event._id,
        });
        for (let ticket of tickets) {
          //send email to each user for review
          console.log("Sending email to user", ticket.user);
          const res = await SendReviewRequestMail({
            email: ticket.buyer.email,
            event: event._id,
          });
          if (!res) {
            console.log("Error sending email to user", ticket.buyer.email);
          }
        }
        event.mailsSent = true;
        await event.save();
      }
    },
    null,
    true,
    "Asia/Kolkata"
  );
  job.start();
  console.log("Event Review Email Sending Cron Job Started");
};
