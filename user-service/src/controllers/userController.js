const User = require('../models/userModel');
const { sendMessage } = require('../../../shared/utils/messageQueue');

async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    sendMessage('user_events', { type: 'USER_CREATED', payload: user });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser };
