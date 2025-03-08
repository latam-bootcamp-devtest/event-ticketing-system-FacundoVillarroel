const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    type: "UUID",
    default: () => randomUUID(),
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

/* {
    “eventId”: 1,
    “name”: “Lantern rite”
    “date”: “2025-03-08”
    “availableSeats”: 10
    } */
