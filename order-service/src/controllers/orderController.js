const Order = require('../models/orderModel');
const { sendMessage } = require('../../../shared/utils/messageQueue');

async function createOrder(req, res) {
  try {
    const order = new Order(req.body);
    await order.save();
    sendMessage('order_events', { type: 'ORDER_CREATED', payload: order });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createOrder, getOrders };
