import React, { useState, useEffect } from "react";
import EventsList from "../../components/eventList/EventsList";

import { Container } from "./events.styles";

const Events = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/events`
      );
      const data = await response.json();

      setEvents(data);
      console.log("EVENTS: ", data);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container>
      <h1>Upcoming events</h1>
      <EventsList events={events} />
    </Container>
  );
};

export default Events;
