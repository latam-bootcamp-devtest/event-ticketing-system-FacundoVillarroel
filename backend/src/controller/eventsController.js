const Event = require("../model/eventModel");

const createEvent = async (req, res, next) => {
  try {
    const { name, date, availableSeats } = req.body;
    const event = { name, date, availableSeats };
    const eventCreated = await new Event(event).save();
    res.status(201).send(eventCreated);
  } catch (error) {
    console.error("Error creating event: ", error);
    res.status(500).send({ message: "Error creating event" });
  }
};

module.exports = { createEvent };