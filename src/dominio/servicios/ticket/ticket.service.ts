import { Injectable } from '@nestjs/common';
import { Ticket } from 'src/dominio/entidades/ticket.entity';

@Injectable()
export class TicketService {
  private tickets: Ticket[] = [];

  create(ticket: Ticket): Ticket {
    this.tickets.push(ticket);
    return ticket;
  }
}
