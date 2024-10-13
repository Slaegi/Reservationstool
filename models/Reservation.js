const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  reservedBy: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
