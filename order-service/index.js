const express = require('express');
const amqp = require('amqplib');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/orderDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const orderSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    quantity: Number,
});

const Order = mongoose.model('Order', orderSchema);

let channel, connection;


async function connectRabbitMQ() {
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue("orderQueue");
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error("RabbitMQ connection error", error);
    }
}


app.post('/placeOrder', async (req, res) => {
    const order = new Order(req.body);
    await order.save();

  
    const orderDetails = {
        orderId: order._id,
        productId: order.productId,
        quantity: order.quantity
    };
    channel.sendToQueue("orderQueue", Buffer.from(JSON.stringify(orderDetails)));

    res.status(201).send('Order placed successfully');
});

app.listen(3003, () => {
    console.log('Order Service running on port 3003');
    connectRabbitMQ(); 
});
