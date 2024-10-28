// backend/server.js
const express = require('express');
const sequelize = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express(); // Initialize 'app' here

const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://mycalendarappeventmngmt.netlify.app', // Production frontend
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials if needed
}));

app.use(express.json());

app.use('/api/v1/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running properly!');
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.log('Database connection failed:', error));
