const Reservation = require('./models/Reservation');

// Get all reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new reservation
app.post('/api/reservations', async (req, res) => {
  const { seatNumber, reservedBy } = req.body;

  try {
    // Check if seat is already reserved
    const existingReservation = await Reservation.findOne({ seatNumber });
    if (existingReservation) {
      return res.status(400).json({ error: 'Seat already reserved' });
    }

    const newReservation = new Reservation({ seatNumber, reservedBy });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a reservation (for seat unlock)
app.delete('/api/reservations/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    await reservation.remove();
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
