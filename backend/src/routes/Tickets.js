const express = require("express");

const {
  createTicket,
  deleteTicket,
} = require("../controller/ticketController");

const TicketRouter = express.Router();

TicketRouter.post("/", createTicket);

TicketRouter.delete("/:ticketId", deleteTicket);



module.exports = TicketRouter;
