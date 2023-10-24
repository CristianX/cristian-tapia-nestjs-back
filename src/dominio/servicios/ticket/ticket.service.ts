import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketFiltroDto } from 'src/aplicacion/dtos/ticket-filtro.dto';
import { Ticket } from 'src/dominio/entidades/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  private tickets: Ticket[] = [];

  create(ticket: Ticket): Ticket {
    this.tickets.push(ticket);
    return ticket;
  }

  findOne(id: string): Ticket | undefined {
    return this.tickets.find((ticket) => ticket.id === id);
  }

  async findAll(ticketsFiltroDto: TicketFiltroDto): Promise<Ticket[]> {
    const { descripcion, limite, offset } = ticketsFiltroDto;

    let query = this.ticketRepository.createQueryBuilder('ticket');

    if (descripcion) {
      query = query.where('ticket.descripcion LIKE :descripcion', {
        descripcion: `%${descripcion}%`,
      });
    }

    if (typeof limite === 'number') {
      query = query.limit(limite);
    }

    if (typeof offset === 'number') {
      query = query.offset(offset);
    }

    return query.getMany();
  }
}
