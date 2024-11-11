const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/productRoutes');
const { consumeMessage } = require('../shared/utils/messageQueue');

const app = express();
app.use(express.json());
app.use('/products', productRoutes);

mongoose.connect('mongodb://localhost:27017/productDB', { useNewUrlParser: true, useUnifiedTopology: true });

consumeMessage('product_events', (message) => {
  console.log("Product Event Received:", message);
});

app.listen(3002, () => {
  console.log("Product Service is running on port 3002");
});
