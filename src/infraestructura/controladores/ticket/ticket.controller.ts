import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ConsultarTicketCasoUso } from 'src/aplicacion/casos-uso/consultar-ticket.caso-uso';
import { CrearTicketCasoUso } from 'src/aplicacion/casos-uso/crear-ticket.caso-uso';
import { TicketCreateDTO } from 'src/aplicacion/dtos/ticket-create.dto';
import { Ticket } from 'src/dominio/entidades/ticket.entity';

@Controller('tickets')
export class TicketController {
  constructor(
    private readonly crearTicketCasoUso: CrearTicketCasoUso,
    private readonly consultarTicketCasoUso: ConsultarTicketCasoUso,
  ) {}

  @Post()
  crear(@Body() ticketCreateDto: TicketCreateDTO) {
    return this.crearTicketCasoUso.execute(ticketCreateDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ticket> {
    const ticket = await this.consultarTicketCasoUso.execute(id);
    if (!ticket) {
      throw new NotFoundException('Ticket no encontrado');
    }
    return ticket;
  }
}
