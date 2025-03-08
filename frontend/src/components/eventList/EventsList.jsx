import React from "react";
import ListItem from "../listItem/ListItem";

import { Container } from "./eventList.styles";

const EventsList = ({ events }) => {
  return (
    <Container>
      {events.length ? (
        <>
          {events.map((event) => (
            <ListItem key={event._id} event={event} />
          ))}
        </>
      ) : (
        <h4>No events available</h4>
      )}
    </Container>
  );
};

export default EventsList;
