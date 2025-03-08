const express = require("express");

const { createTicket } = require("../controller/ticketController");

const TicketRouter = express.Router();

TicketRouter.post("/", createTicket);

module.exports = TicketRouter;
