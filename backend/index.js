const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const EventRouter = require("./src/routes/Events");

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

//routes
app.use("/events", EventRouter);

app.listen(PORT, () => {
  console.log("app listening on port:", PORT);
});
