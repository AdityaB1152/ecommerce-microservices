const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  totalPrice: Number,
  status: String
});

module.exports = mongoose.model('Order', orderSchema);
