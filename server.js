const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sea_salon', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Reservation Schema
const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  datetime: Date
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const Review = mongoose.model('Review', reviewSchema);

// API routes
app.post('/reservations', async (req, res) => {
  const reservation = new Reservation(req.body);
  await reservation.save();
  res.send(reservation);
});

app.post('/reviews', async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.send(review);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
