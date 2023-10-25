import { Injectable } from '@nestjs/common';
import { TicketService } from 'src/dominio/servicios/ticket/ticket.service';
import { TicketCreateDTO } from '../dtos/ticket-create.dto';
import { Ticket } from 'src/dominio/entidades/ticket.entity';

@Injectable()
export class CrearTicketCasoUso {
  constructor(private ticketService: TicketService) {}

  execute(ticketCreateDto: TicketCreateDTO): Ticket {
    const ticket = new Ticket();
    const now = new Date();
    ticket.id =
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');
    ticket.description = ticketCreateDto.descripcion;

    return this.ticketService.create(ticket);
  }
}
