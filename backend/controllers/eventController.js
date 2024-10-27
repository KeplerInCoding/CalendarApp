// backend/controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const newEvent = await Event.create({ title, date, description, userId: req.userId });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { userId: req.userId } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve events' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const event = await Event.findOne({ where: { id: req.params.id, userId: req.userId } });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.title = title;
    event.date = date;
    event.description = description;
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const result = await Event.destroy({ where: { id: req.params.id, userId: req.userId } });

    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event' });
  }
};
