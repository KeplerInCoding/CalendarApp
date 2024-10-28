// backend/server.js
const express = require('express');
const sequelize = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express(); // Initialize 'app' here

app.use(cors({
  origin: 'http://localhost:3000', // Replace this with your frontend URL
  credentials: true, // Allow credentials if needed
}));

app.use(express.json());

app.use('/api/v1/events', eventRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.log('Database connection failed:', error));
