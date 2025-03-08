const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const EventRouter = require("./src/routes/Events");
const TicketRouter = require("./src/routes/Tickets");

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

//DB connection
connectDB();

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(`method: ${req.method}. path: ${req.path}`);
  next();
});
app.use(cors());

//routes
app.use("/events", EventRouter);
app.use("/tickets", TicketRouter);


app.listen(PORT, () => {
  console.log("app listening on port:", PORT);
});
