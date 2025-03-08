const Event = require("../model/eventModel");


const getEvents = async (req, res, next) => {
  /* 
  method descripton: Get events from DB sort them by date, also filter old events
  input variables: page (number) & pageSize (number) [as query parameters]
  return example: { 
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
    let page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const events = await Event.find();
    let pageCount = 1;
    if (pageSize) {
      pageCount = Math.ceil(events.length / pageSize);
    }
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
      if (page > pageCount) {
        page = pageCount;
      }

      const newEventsList = eventsSorted.slice(
        page * pageSize - pageSize,
        page * pageSize
      );
      res.send({
        currentPage: page,
        pageSize: pageSize,
        totalPages: pageCount,
        events: newEventsList,
      });
      return;
    }
    res.send(eventsSorted);
  } catch (error) {
    console.error("Error getting events: ", error);
    res.status(500).send({ message: "Error getting events" });
  }
};

const getEventsById = async (req, res, next) => {
  /*
  method description: Get an event by its ID
  input variables: eventId (path parameter)
  return: returns the Event or an error message.
   */
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
  /*
    method description: creates an event
    input variables: name, date, availableSeats (request body)
    return: status 201 and newEvent or error message
   */
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