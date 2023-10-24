import { Injectable } from '@nestjs/common';
import { TicketService } from '../../dominio/servicios/ticket/ticket.service';
import { TicketFiltroDto } from '../dtos/ticket-filtro.dto';
import { Ticket } from 'src/dominio/entidades/ticket.entity';

@Injectable()
export class ConsultarTicketsFiltroCasoUso {
  constructor(private readonly ticketService: TicketService) {}

  async execute(filtro: TicketFiltroDto): Promise<Ticket[]> {
    return this.ticketService.findAll(filtro);
  }
}
