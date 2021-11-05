const amqp = require('amqplib');

const message = {}

async function connect(){
  try {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel();
    const result  = await channel.assertQueue("jobs");

    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));

    console.log("Job send successfully");

  } catch (error) {
    console.log(error);   
  }
}

connect()