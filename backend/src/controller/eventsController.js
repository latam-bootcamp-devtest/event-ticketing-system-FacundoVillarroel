const Event = require("../model/eventModel");


const getEvents = async (req, res, next) => {
  /* return example: { 
“currentPage”: 1, 
“pageSize”: 10, 
“totalPages”: 3, 
“events”: [ 
{ 
“eventId”: 1, 
“name”: “Lantern rite” 
“date”: “2025-03-08” 
“availableSeats”: 10 
} 
]  
} */
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const events = await Event.find();
    const eventsFiltered = events.filter(
      (event) => new Date(event.date) > new Date()
    );

    const eventsSorted = eventsFiltered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
    });
    //if page and pageSize are in the query then add pagination.
    if (page && pageSize) {
      const newEventsList = eventsSorted.slice(
        page * pageSize - pageSize,
        page * pageSize
      );
      res.send(newEventsList);
      return;
    }
    res.send(eventsSorted);
  } catch (error) {
    console.error("Error getting events: ", error);
    res.status(500).send({ message: "Error getting events" });
  }
};

const getEventsById = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const eventFound = await Event.findById(eventId);
    if (!eventFound) {
      res.status(404).send({ message: "No event found" });
      return;
    }
    res.send(eventFound);
  } catch (error) {
    console.error("Error getting event: ", error);
    res.status(500).send({ message: "Error getting event" });
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
    const eventFormatted = {
      eventId: eventCreated._id,
      name: eventCreated.name,
      date: eventCreated.date,
      availableSeats: eventCreated.availableSeats,
    };
    res.status(201).send(eventFormatted);
  } catch (error) {
    console.error("Error creating event: ", error);
    res.status(500).send({ message: "Error creating event" });
  }
};

module.exports = { getEvents, getEventsById, createEvent };