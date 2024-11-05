const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views'))); 

// Routes
const urlRouter = require('./routes/urlroutes');
app.use('/', urlRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
