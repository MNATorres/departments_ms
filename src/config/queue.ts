import amqp from "amqplib";

let channel: amqp.Channel | null = null;
const QUEUE_NAME = "departments_events";

/**
 * Conecta la aplicación con el servidor de RabbitMQ
 */
export async function connectQueue() {
  try {
    // Como corre local en Docker, nos conectamos usando el usuario 'guest' que configuraste
    const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
    channel = await connection.createChannel();

    // Aseguramos que la cola exista. 'durable: true' hace que si RabbitMQ se reinicia, la cola no se borre
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(
      "🐇 Connected to RabbitMQ successfully. Queue ready:",
      QUEUE_NAME,
    );
  } catch (error) {
    console.error("❌ Failed to connect to RabbitMQ:", error);
  }
}

/**
 * Envía un mensaje en formato JSON a la cola
 */
export function publishEvent(event: string, data: any) {
  if (!channel) {
    console.error(
      "❌ Cannot publish event. RabbitMQ channel is not initialized.",
    );
    return;
  }

  const payload = {
    event,
    data,
    timestamp: new Date().toISOString(),
  };

  // Convertimos el objeto de JS a un Buffer de texto para que viaje por la red
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)), {
    persistent: true, // El mensaje se guarda en disco duro; si RabbitMQ se cae, el mensaje sobrevive
  });

  console.log(`📣 Event published to queue [${QUEUE_NAME}]:`, event);
}
