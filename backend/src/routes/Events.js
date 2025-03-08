const express = require("express");
const { createEvent } = require("../controller/eventsController");

const EventRouter = express.Router();

EventRouter.get("/", (req, res, next) => {});

EventRouter.post("/", createEvent);

module.exports = EventRouter;
