const express = require("express");
const connectDB = require("./config/database");
const router = require("./routes/index");

const app = express();

app.use(express.json());
app.use("/api", router);

// Display some message in / route
app.get("/", (req, res) => {
  res.send("Welcome to the Crypto API");
});

connectDB();

module.exports = app;
