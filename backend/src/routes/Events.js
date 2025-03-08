const express = require("express");
const {
  getEvents,
  getEventsById,
  createEvent,
} = require("../controller/eventsController");

const EventRouter = express.Router();

EventRouter.get("/", getEvents);

EventRouter.get("/:eventId", getEventsById);

EventRouter.post("/", createEvent);

module.exports = EventRouter;
