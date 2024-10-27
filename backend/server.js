// backend/server.js
const express = require('express');
const sequelize = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/v1/events', eventRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.log('Database connection failed:', error));
