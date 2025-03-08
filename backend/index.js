const express = require("express");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 8080;

const app = express();

app.listen(PORT, () => {
  console.log("app listening on port:", PORT);
});
