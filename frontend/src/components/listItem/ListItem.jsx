import React from "react";

import {
  Container,
  ImageContainer,
  DetailsContainer,
  Text,
} from "./listItem.styles";

const ListItem = ({ event }) => {
  return (
    <Container>
      <ImageContainer
        alt="Event Image"
        src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <DetailsContainer>
        <Text>Name: {event.name}</Text>
        <Text>Date: {event.date}</Text>
        <Text>Price: ${event.ticketPrice}</Text>
      </DetailsContainer>
    </Container>
  );
};

export default ListItem;
