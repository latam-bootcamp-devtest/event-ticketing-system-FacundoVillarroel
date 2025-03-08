const express = require("express");

const { getBookingHistory } = require("../controller/usersController");

const UsersRouter = express.Router();

UsersRouter.get("/:userId/tickets", getBookingHistory);

module.exports = UsersRouter;
