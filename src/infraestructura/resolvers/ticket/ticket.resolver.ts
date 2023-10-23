import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CrearTicketCasoUso } from 'src/aplicacion/casos-uso/crear-ticket.caso-uso';
import { TicketCreateDTO } from 'src/aplicacion/dtos/ticket-create.dto';
import { TicketType } from 'src/infraestructura/graphql/types/ticket.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => TicketType)
export class TicketResolver {
  constructor(private readonly crearTicketCasoUso: CrearTicketCasoUso) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => TicketType)
  async crearTicket(@Args('input') ticketCreateDto: TicketCreateDTO) {
    return this.crearTicketCasoUso.execute(ticketCreateDto);
  }
}
