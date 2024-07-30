const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = 3000;
require('dotenv').config();

// MongoDB connection

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());



// Flight Schema
const flightSchema = new mongoose.Schema({
    flight_id: String,
    airline: String,
    status: String,
    departure_gate: String,
    arrival_gate: String,
    scheduled_departure: Date,
    scheduled_arrival: Date,
    actual_departure: Date,
    actual_arrival: Date
});


const Flight = mongoose.model('Flight', flightSchema);

// Routes
app.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST route to add a flight
app.post('/flights', async (req, res) => {
    const flightData = req.body;
    
    const flight = new Flight({
        flight_id: flightData.flight_id,
        airline: flightData.airline,
        status: flightData.status,
        departure_gate: flightData.departure_gate,
        arrival_gate: flightData.arrival_gate,
        scheduled_departure: flightData.scheduled_departure,
        scheduled_arrival: flightData.scheduled_arrival,
        actual_departure: flightData.actual_departure,
        actual_arrival: flightData.actual_arrival
    });

    try {
        const newFlight = await flight.save();
        res.status(201).json(newFlight);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const notificationSchema = new mongoose.Schema({
    notification_id: String,
    flight_id: String,
    message: String,
    timestamp: Date,
    method: String,
    recipient: String,
  });
  
  const Notification = mongoose.model('Notification', notificationSchema);
  


  app.post('/get-updates', async (req, res) => {
    const { flightId, userEmail } = req.body; 

    try {
        const flight = await Flight.findOne({ flight_id: flightId });
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        
        const notification = await Notification.findOne({ flight_id: flightId, method: 'Email' });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found for this flight' });
        }
        console.log(userEmail);
        console.log(flightId);

        const msg = {
            to: userEmail, 
            from: 'flighttracker41@gmail.com', 
            subject: `Flight Update: ${flight.flight_id}`,
            text: notification.message 
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent to:', userEmail);
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
        }

        res.json({ message: 'You will receive updates for this flight.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});


  app.post('/add-notification', async (req, res) => {
    const { notification_id, flight_id, message, timestamp, method, recipient } = req.body;
  
    
    const newNotification = new Notification({
      notification_id,
      flight_id,
      message,
      timestamp,
      method,
      recipient,
    });
  
    try {
     
      await newNotification.save();
      res.status(201).json({ message: 'Notification added successfully', notification: newNotification });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
