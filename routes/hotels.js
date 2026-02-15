const express = require('express');
const router = express.Router();
const hotels = require('../data/hotels.json');

// List all hotels
router.get('/', (req, res) => {
  res.json(hotels);
});

// Get hotel by ID
router.get('/:id', (req, res) => {
  const hotel = hotels.find(h => h.id === parseInt(req.params.id));
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json(hotel);
});

// Add new hotel
router.post('/', (req, res) => {
  const newHotel = { id: hotels.length + 1, ...req.body };
  hotels.push(newHotel);
  res.json({ message: "Hotel added", hotel: newHotel });
});

// Update hotel
router.put('/:id', (req, res) => {
  const hotel = hotels.find(h => h.id === parseInt(req.params.id));
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  Object.assign(hotel, req.body);
  res.json({ message: "Hotel updated", hotel });
});

// Delete hotel
router.delete('/:id', (req, res) => {
  const index = hotels.findIndex(h => h.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Hotel not found" });
  hotels.splice(index, 1);
  res.json({ message: "Hotel deleted" });
});

// Book hotel
router.post('/:id/book', (req, res) => {
  const hotel = hotels.find(h => h.id === parseInt(req.params.id));
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  hotel.booked = true;
  res.json({ message: "Hotel booked", hotel });
});

// Cancel booking
router.post('/:id/cancel', (req, res) => {
  const hotel = hotels.find(h => h.id === parseInt(req.params.id));
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  hotel.booked = false;
  res.json({ message: "Booking cancelled", hotel });
});

module.exports = router;