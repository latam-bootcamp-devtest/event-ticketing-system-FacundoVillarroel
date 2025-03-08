import React, { useState, useEffect } from "react";
import EventsList from "../../components/eventList/EventsList";
import Loading from "../../components/loading/Loading";

import { Container } from "./events.styles";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/events`
      );
      const data = await response.json();

      setEvents(data);
      console.log("EVENTS: ", data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container>
      <h1>Upcoming events</h1>
      {isLoading ? <Loading /> : <EventsList events={events} />}
    </Container>
  );
};

export default Events;
