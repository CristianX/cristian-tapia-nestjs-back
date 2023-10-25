// src/tickets/tickets.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from 'src/aplicacion/dtos/create-ticket-dto';
import { Ticket } from 'src/dominio/entidades/ticket.entity';
import { KafkaService } from 'src/infraestructura/kafka/kafka/kafka.service';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsKafkaService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly httpService: HttpService,
    private readonly kafkaService: KafkaService,
  ) {}

  async createTicket(dto: CreateTicketDto): Promise<any> {
    const ticket = this.ticketRepository.create(dto);
    ticket.status = 'pending';

    let apiFakePath: string;
    switch (ticket.category) {
      case 'incident':
        apiFakePath = '1';
        break;
      case 'support':
        apiFakePath = '2';
        break;
      case 'error':
        apiFakePath = '3';
        break;
    }

    const apiResponse = await this.httpService
      .get(`https://jsonplaceholder.typicode.com/posts/${apiFakePath}`)
      .toPromise();

    const savedTicket = await this.ticketRepository.save(ticket);

    if (apiResponse.status === 200) {
      await this.kafkaService.enviarMensaje('technical_support_tickets', {
        ticketId: savedTicket.id,
        state: apiResponse.data.status,
      });
    }

    return savedTicket;
  }

  async updateTicketStatus(ticketId: string, newState: string): Promise<void> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
    });
    if (!ticket) {
      // Lanzar una excepción o manejar el error de alguna manera
      throw new Error('Ticket no encontrado');
    }
    ticket.status = newState;
    await this.ticketRepository.save(ticket);
  }
}
