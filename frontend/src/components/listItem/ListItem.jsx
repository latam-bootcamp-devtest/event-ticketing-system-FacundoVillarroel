import React from "react";
import { useNavigate } from "react-router";

import {
  Container,
  ImageContainer,
  DetailsContainer,
  Text,
} from "./listItem.styles";

const ListItem = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <Container onClick={handleClick}>
      <ImageContainer
        alt="Event Image"
        src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <DetailsContainer>
        <Text>Name: {event.name}</Text>
        <Text>Date: {new Date(event.date).toLocaleString()}</Text>
        <Text>Price: ${event.ticketPrice}</Text>
      </DetailsContainer>
    </Container>
  );
};

export default ListItem;
