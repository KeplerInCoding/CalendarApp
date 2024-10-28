// backend/controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  console.log('Creating event...');
  console.log('Request body:', req.body);

  try {
    const { title, description, date, end_date } = req.body;

    // Validate the incoming data
    if (!title || !date || !end_date || !req.userId) {
      console.error('Validation Error: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEvent = await Event.create({ title, date, end_date, description, userId:req.userId });
    
    console.log('Event created:', newEvent);
    return res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    // Log the userId to verify it's being passed correctly
    // console.log("User ID from request:", req.userId);

    // Fetch events based on userId
    const events = await Event.findAll({ where: { userId: req.userId } });

    // Log the events to check what is retrieved
    console.log("Fetched events:", events);

    res.json(events);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching events:", error);

    res.status(500).json({ message: 'Failed to retrieve events' });
  }
};


exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, end_date } = req.body;

  console.log('Updating event with ID:', id);
  console.log('Request body:', req.body);

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the event fields
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.end_date = date || event.end_date;

    await event.save();
    console.log('Event updated successfully:', event);

    return res.status(200).json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ message: 'Failed to update event' });
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
