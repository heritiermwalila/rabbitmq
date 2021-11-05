const amqp = require("amqplib");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", message => {
      const result = JSON.parse(message.content.toString());
      console.log(`Received job with data ${JSON.stringify(result)}`);

      if(Object.values(result).length > 0){
        channel.ack(message);
      }
    })

    console.log('waiting for messages...');

    
  } catch (error) {
    console.log(error);
  }
}

connect();
