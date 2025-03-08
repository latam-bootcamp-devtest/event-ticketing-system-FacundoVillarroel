import React from "react";
import { useParams } from "react-router";

const EventDetails = () => {
  const { eventId } = useParams();

  console.log(eventId);
  return <div>EventDetails</div>;
};

export default EventDetails;
