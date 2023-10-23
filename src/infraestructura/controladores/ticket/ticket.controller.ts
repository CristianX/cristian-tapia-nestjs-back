import { Body, Controller, Post } from '@nestjs/common';
import { CrearTicketCasoUso } from 'src/aplicacion/casos-uso/crear-ticket.caso-uso';
import { TicketCreateDTO } from 'src/aplicacion/dtos/ticket-create.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly crearTicketCasoUso: CrearTicketCasoUso) {}

  @Post()
  crear(@Body() ticketCreateDto: TicketCreateDTO) {
    return this.crearTicketCasoUso.execute(ticketCreateDto);
  }
}
