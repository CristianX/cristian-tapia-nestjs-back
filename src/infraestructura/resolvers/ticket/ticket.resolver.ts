import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConsultarTicketCasoUso } from 'src/aplicacion/casos-uso/consultar-ticket.caso-uso';
import { CrearTicketCasoUso } from 'src/aplicacion/casos-uso/crear-ticket.caso-uso';
import { TicketCreateDTO } from 'src/aplicacion/dtos/ticket-create.dto';
import { TicketType } from 'src/infraestructura/graphql/types/ticket.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => TicketType)
export class TicketResolver {
  constructor(
    private readonly crearTicketCasoUso: CrearTicketCasoUso,
    private readonly consultarTicketCasoUso: ConsultarTicketCasoUso,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => TicketType)
  async crearTicket(@Args('input') ticketCreateDto: TicketCreateDTO) {
    return this.crearTicketCasoUso.execute(ticketCreateDto);
  }

  @Query(() => TicketType, { nullable: true })
  async consultarTicket(@Args('id', { type: () => String }) id: string) {
    return this.consultarTicketCasoUso.execute(id);
  }
}
