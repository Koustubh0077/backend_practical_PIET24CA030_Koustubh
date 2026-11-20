// Task 1 - Library Book Management API (main server file)
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// logger middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/books", bookRoutes);

// route not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON" });
  }
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
