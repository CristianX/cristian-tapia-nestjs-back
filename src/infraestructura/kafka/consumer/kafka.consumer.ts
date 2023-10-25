import { TicketsKafkaService } from 'src/dominio/servicios/ticket-kafka/ticket-kafka.service';
import { KafkaService } from '../kafka/kafka.service';

export class KafkaConsumer {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly ticketKafkaService: TicketsKafkaService,
  ) {}

  async initializeConsumer() {
    await this.kafkaService.consumirMensaje(
      'technical_support_tickets',
      async ({ message }) => {
        const payload = JSON.parse(message.value.toString());
        const ticketId = payload.ticketId;
        const newState = payload.state;

        await this.ticketKafkaService.updateTicketStatus(ticketId, newState);
      },
    );
  }
}
