const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
