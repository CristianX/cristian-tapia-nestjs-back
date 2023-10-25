import { Kafka } from 'kafkajs';
import { kafkaConfig } from '../kafka.config';

export class KafkaService {
  private kafkaClient: Kafka;

  constructor() {
    this.kafkaClient = new Kafka(kafkaConfig);
  }

  async enviarMensaje(topic: string, message: any): Promise<void> {
    const producer = this.kafkaClient.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await producer.disconnect();
  }

  async consumirMensaje(
    topic: string,
    eachMessage: (data: any) => Promise<void>,
  ): Promise<void> {
    const consumer = this.kafkaClient.consumer({ groupId: 'my-group' });
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({ eachMessage });
  }
}
