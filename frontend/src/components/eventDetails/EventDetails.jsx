import React, { useState } from "react";
import EventForm from "../eventForm/EventForm";

import {
  Containter,
  Image,
  DetailsContainer,
  Text,
  Button,
} from "./eventDetails.styles";

const EventDetails = ({ event }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Containter>
      <Image
        alt="Event Image"
        src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <DetailsContainer>
        <h4>Event Details</h4>
        <Text>Event: {event.name}</Text>
        <Text>Date: {event.date}</Text>
        <Text>Location: {event.location}</Text>
        <Text>Price: ${event.price}</Text>
        <Text>Available seats: ${event.availableSeats}</Text>
        {isFormOpen ? (
          <EventForm eventId={event._id} setIsFormOpen={setIsFormOpen} />
        ) : (
          <Button onClick={() => setIsFormOpen(true)}> Book tickets</Button>
        )}
      </DetailsContainer>
    </Containter>
  );
};

export default EventDetails;
