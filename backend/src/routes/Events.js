const express = require("express");
const { getEvents, createEvent } = require("../controller/eventsController");

const EventRouter = express.Router();

EventRouter.get("/", getEvents);

EventRouter.post("/", createEvent);

module.exports = EventRouter;
