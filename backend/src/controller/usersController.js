const Ticket = require("../model/ticketModel");

const getBookingHistory = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { page, pageSize, startDate, endDate, sort, search } = req.query;
    const bookings = await Ticket.find({ userId });

    if (!bookings) {
      res.status(404).send({ message: "this User do not have any booking" });
      return;
    }

    const eventsIds = bookings.map((ticket) => ticket.eventId);

    //pagination
    let pageCount = 1;
    if (pageSize) {
      pageCount = Math.ceil(bookings.length / pageSize);
    }

    if (page && pageSize) {
      if (page > pageCount) {
        page = pageCount;
      }

      const paginationBookingList = bookings.slice(
        page * pageSize - pageSize,
        page * pageSize
      );

      res.send(paginationBookingList);
      return;
    }
    
    res.send(bookings);
  } catch (error) {
    console.error("Error getting booking history: ", error);
    res.status(500).send({ message: "Error getting booking history:" });
  }
};

module.exports = { getBookingHistory };
