const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST: Save a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Your message has been received!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error. Try again later.' });
  }
});

// GET: Retrieve all messages (for admin view later)
router.get('/', async (req, res) => {
  const messages = await ContactMessage.find().sort({ date: -1 });
  res.json(messages);
});

module.exports = router;
