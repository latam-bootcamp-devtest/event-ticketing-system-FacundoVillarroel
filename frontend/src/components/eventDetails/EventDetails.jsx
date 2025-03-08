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
        <Text>Date: {new Date(event.date).toLocaleString()}</Text>
        <Text>Location: {event.location}</Text>
        <Text>Price: ${event.price || 10}</Text>
        <Text>Available seats: ${event.availableSeats}</Text>
        <hr></hr>
        {isFormOpen ? (
          <EventForm
            eventId={event._id}
            setIsFormOpen={setIsFormOpen}
            price={event.price || 10}
          />
        ) : (
          <Button onClick={() => setIsFormOpen(true)}> Book tickets</Button>
        )}
      </DetailsContainer>
    </Containter>
  );
};

export default EventDetails;
