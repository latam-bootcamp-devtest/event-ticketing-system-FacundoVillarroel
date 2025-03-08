const Ticket = require("../model/ticketModel");

const getBookingHistory = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { page, Pagesize, startDate, endDate, sort, search } = req.query;
    const bookings = await Ticket.find({ userId });
    if (!bookings) {
      res.status(404).send({ message: "this User do not have any booking" });
      return;
    }
    res.send(bookings);
  } catch (error) {
    console.error("Error getting booking history: ", error);
    res.status(500).send({ message: "Error getting booking history:" });
  }
};

module.exports = { getBookingHistory };
