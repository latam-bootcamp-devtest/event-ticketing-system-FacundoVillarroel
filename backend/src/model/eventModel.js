const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
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
