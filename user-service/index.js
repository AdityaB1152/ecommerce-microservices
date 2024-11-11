const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const { consumeMessage } = require('../shared/utils/messageQueue');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

consumeMessage('user_events', (message) => {
  console.log("User Event Received:", message);
});

app.listen(3001, () => {
  console.log("User Service is running on port 3001");
});
