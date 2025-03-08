import React, { useState } from "react";

import { Form, Button } from "./eventForm.styles";

const initialState = {
  userId: "",
  quantity: 1,
};

const EventForm = ({ eventId, setIsFormOpen, price }) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendBooking = async () => {
    try {
      const body = {
        userId: formData.userId,
        eventId: eventId,
        quantity: formData.quantity,
      };
      console.log(body);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        window.alert("Error booking your ticket, please try again.");
        throw new Error("Error booking ticket");
      }
      const data = await response.json();
      console.log("New Ticket: ", data);
      window.alert("ticket booked successfully");
      setFormData(initialState);
    } catch (error) {
      console.error("Error booking ticket", Error);
      window.alert("Error booking your ticket, please try again.");
    }
  };

  const totalPrice = parseInt(price) * formData.quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    sendBooking();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type={"text"}
        name="userId"
        value={formData.userId}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="price">Quantity:</label>
      <input
        type={"number"}
        name="quantity"
        max={10}
        min={0}
        value={formData.quantity}
        onChange={handleInputChange}
        required
      />
      <p>Total price: ${totalPrice}</p>
      <Button type="submit" disabled={formData.quantity < 1}>
        Book now
      </Button>
      <Button onClick={() => setIsFormOpen(false)}>Cancel</Button>
    </Form>
  );
};

export default EventForm;
