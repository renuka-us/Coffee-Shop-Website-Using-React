// confirmReservation.js

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Connect to MongoDB (assuming your connection setup is in a separate file)
// Import the MongoDB connection object
require('./server');
// Define Reservation schema
const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  time: String,
  numberOfPeople: Number,
});

// Define Reservation model
const Reservation = mongoose.model('Reservations', reservationSchema);

// API endpoint to create a reservation
router.post('/api/confirmReservation', async (req, res) => {
  try {
    const { name, email, date, time, numberOfPeople } = req.body;
    const reservation = new Reservation({
      name,
      email,
      date,
      time,
      numberOfPeople,
    });
    await reservation.save();
    res.status(201).json({ message: 'Reservation successful' });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Reservation failed' });
  }
});

module.exports = router;
