const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json);

mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send('User registered successfully');
});

app.listen(3001, () => console.log('User Service running on port 3001'));