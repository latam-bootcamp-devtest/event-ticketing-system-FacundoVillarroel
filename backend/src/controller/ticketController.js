const Ticket = require("../model/ticketModel");
const Event = require("../model/eventModel");

const createTicket = async (req, res, next) => {
  try {
    const { userId, eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).send({ message: "Event not found" });
      return;
    }
    if (event.seats <= 0) {
      res.status(409).send({ message: "no seats available" });
      return;
    }
    event.availableSeats = parseInt(event.availableSeats) - 1;
    await event.save();
    const newTicket = await Ticket({ userId, eventId }).save();
    const ticketFormatted = {
      userId: newTicket.userId,
      eventId: newTicket.eventId,
      ticketId: newTicket._id,
    };
    res.status(201).send(ticketFormatted);
  } catch (error) {
    console.error("Error creating ticket: ", error);
    res.status(500).send({ message: "Error creating ticket" });
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      res.status(404).send({ message: "Ticket not found" });
      return;
    }
    const event = await Event.findById(ticket.eventId);
    //check if the event is already passed
    if (new Date(event.date) < new Date()) {
      res.status(400).send({ message: "Cannot cancel past events" });
      return;
    }
    event.availableSeats = parseInt(event.availableSeats) + 1;
    await event.save();
    await Ticket.findByIdAndDelete(ticketId);
    res.status(204).send();
  } catch (error) {
    {
      console.error("Error deleting ticket: ", error);
      res.status(500).send({ message: "Error deleting ticket" });
    }
  }
};
module.exports = { createTicket, deleteTicket };
