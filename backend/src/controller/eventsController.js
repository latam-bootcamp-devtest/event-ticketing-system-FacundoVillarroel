const Event = require("../model/eventModel");


const getEvents = async () => {
  try {
    const { page, pageSize } = req.query;
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    console.error("Error getting events: ", error);
    res.status(500).send({ message: "Error getting events" });
  }
};

const createEvent = async (req, res, next) => {
  try {
    const { name, date, availableSeats } = req.body;
    const dateObj = new Date(date);
    const today = new Date();
    if (dateObj < today) {
      res.status(400).send({ message: "Date must be in the future" });
      return;
    }
    const dateString = dateObj.toISOString();

    if (availableSeats <= 0) {
      res.status(400).send({ message: "availableSeats must be bigger than 0" });
      return;
    }
    const event = { name, date: dateString, availableSeats };
    const eventCreated = await new Event(event).save();
    res.status(201).send(eventCreated);
  } catch (error) {
    console.error("Error creating event: ", error);
    res.status(500).send({ message: "Error creating event" });
  }
};

module.exports = { createEvent };