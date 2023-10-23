import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from 'src/dominio/entidades/ticket.entity';
import { TicketService } from 'src/dominio/servicios/ticket/ticket.service';

@Injectable()
export class ConsultarTicketCasoUso {
  constructor(private readonly ticketService: TicketService) {}

  execute(id: string): Ticket {
    const ticket = this.ticketService.findOne(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }
    return ticket;
  }
}
