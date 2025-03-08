import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import EventDetailsContainter from "../../components/eventDetails/EventDetails";

const initialState = {
  name: "",
  date: "",
  location: "",
  description: "",
  price: null,
  availableSeats: 0,
};

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(initialState);

  const fetchEvent = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/events/${eventId}`
      );
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event", error);
    }
  }, [eventId]);

  console.log("Event: ", event);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return (
    <div>
      <EventDetailsContainter event={event} />
      <button onClick={() => navigate("/events")}>Go back to Events</button>
    </div>
  );
};

export default EventDetails;
