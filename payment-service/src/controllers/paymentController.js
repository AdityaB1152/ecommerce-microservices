const Payment = require('../models/paymentModel');
const { sendMessage } = require('../../../shared/utils/messageQueue');

async function createPayment(req, res) {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    sendMessage('payment_events', { type: 'PAYMENT_CREATED', payload: payment });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPayments(req, res) {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createPayment, getPayments };
