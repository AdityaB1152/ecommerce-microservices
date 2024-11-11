const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./src/routes/orderRoutes');
const { consumeMessage } = require('../shared/utils/messageQueue');

const app = express();
app.use(express.json());
app.use('/orders', orderRoutes);

mongoose.connect('mongodb://localhost:27017/orderDB', { useNewUrlParser: true, useUnifiedTopology: true });

consumeMessage('order_events', (message) => {
  console.log("Order Event Received:", message);
});

app.listen(3003, () => {
  console.log("Order Service is running on port 3003");
});
