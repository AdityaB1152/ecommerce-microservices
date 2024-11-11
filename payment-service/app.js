const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./src/routes/paymentRoutes');
const { consumeMessage } = require('../shared/utils/messageQueue');

const app = express();
app.use(express.json());
app.use('/payments', paymentRoutes);

mongoose.connect('mongodb://localhost:27017/paymentDB', { useNewUrlParser: true, useUnifiedTopology: true });

consumeMessage('payment_events', (message) => {
  console.log("Payment Event Received:", message);
});

app.listen(3004, () => {
  console.log("Payment Service is running on port 3004");
});
