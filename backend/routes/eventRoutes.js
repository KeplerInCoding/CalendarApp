// backend/routes/eventRoutes.js
const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', authMiddleware, getEvents);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

// const Event = require('../models/Event'); // assuming Event model is defined

// router.get('/test', async (req, res) => {
//     try {
//       const events = await Event.findAll(); // or a simpler query if needed
//       res.status(200).json({ success: true, data: events });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Database connection failed' });
//     }
//   });

module.exports = router;
