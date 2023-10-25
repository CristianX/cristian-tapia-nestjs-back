import { KafkaService } from 'src/infraestructura/kafka/kafka/kafka.service';

export class CrearTicketKafkaCasoDeUso {
  constructor(private readonly kafkaService: KafkaService) {}

  async execute(dataTicket: any): Promise<void> {
    await this.kafkaService.enviarMensaje(
      'technical_support_tickets',
      dataTicket,
    );
  }
}
