const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
// MongoDB connection
async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://EcoPlast:EcoPlast@cluster0.nfz3caf.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Exit the application on a failed database connection
    process.exit(1);
  }
}

// Call the function to connect to the database
connectToDatabase();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Import models
const User = require("./src/models/User");
const DropOff = require("./src/models/DropOff");
const PickUpRequest = require("./src/models/PickUpRequest");

// Routes
// User registration
app.post("/api/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  // Implement login logic here
});

// Drop-off creation
app.post("/api/dropoff", async (req, res) => {
  try {
    const newDropOff = new DropOff(req.body);
    await newDropOff.save();
    res.status(201).json(newDropOff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Pick-up request creation
app.post("/api/pickup", async (req, res) => {
  try {
    const newPickUpRequest = new PickUpRequest(req.body);
    await newPickUpRequest.save();
    res.status(201).json(newPickUpRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get drop-offs for a user
app.get("/api/dropoffs/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const dropOffs = await DropOff.find({ user: userId });
    res.json(dropOffs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get pick-up requests for a user
app.get("/api/pickups/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const pickUpRequests = await PickUpRequest.find({ user: userId });
    res.json(pickUpRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
