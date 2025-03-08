const Event = require("../model/eventModel");

const createEvent = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error creating event: ", error);
    res.status(500).send({ message: "Error creating event" });
  }
};
