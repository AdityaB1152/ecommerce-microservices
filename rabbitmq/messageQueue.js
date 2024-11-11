const amqp = require('amqplib');
const config = require('../config/rabbitmqConfig');

let connection;
let channel;

async function connectToRabbitMQ() {
  if (!connection) {
    connection = await amqp.connect(config.url);
    channel = await connection.createChannel();
  }
  return { connection, channel };
}

async function sendMessage(queue, message) {
  await connectToRabbitMQ();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

async function consumeMessage(queue, callback) {
  await connectToRabbitMQ();
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (message) => {
    if (message !== null) {
      callback(JSON.parse(message.content.toString()));
      channel.ack(message);
    }
  });
}

module.exports = { sendMessage, consumeMessage };
