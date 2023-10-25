import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConsultarTicketCasoUso } from 'src/aplicacion/casos-uso/consultar-ticket.caso-uso';
import { ConsultarTicketsFiltroCasoUso } from 'src/aplicacion/casos-uso/consultar-tickets-filtro.caso-uso';
import { CrearTicketKafkaCasoDeUso } from 'src/aplicacion/casos-uso/crear-ticket-kafka.caso-uso';
import { CreateTicketDto } from 'src/aplicacion/dtos/create-ticket-dto';
import { TicketFiltroDto } from 'src/aplicacion/dtos/ticket-filtro.dto';
import { Ticket } from 'src/dominio/entidades/ticket.entity';
import {
  Category,
  Priority,
  Status,
  TicketType,
} from 'src/infraestructura/graphql/types/ticket.type';

function mapTicketToTicketType(ticket: Ticket): TicketType {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    priority: Priority[ticket.priority.toUpperCase() as keyof typeof Priority],
    category: Category[ticket.category.toUpperCase() as keyof typeof Category],
    status: Status[ticket.status.toUpperCase() as keyof typeof Status],
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => TicketType)
export class TicketResolver {
  constructor(
    private readonly crearTicketCasoUso: CrearTicketKafkaCasoDeUso,
    private readonly consultarTicketCasoUso: ConsultarTicketCasoUso,
    private readonly consultarTicketsFiltroCasoUso: ConsultarTicketsFiltroCasoUso,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => TicketType)
  async crearTicket(@Args('input') ticketCreateDto: CreateTicketDto) {
    return this.crearTicketCasoUso.execute(ticketCreateDto);
  }

  @Query(() => TicketType, { nullable: true })
  async consultarTicket(@Args('id', { type: () => String }) id: string) {
    return this.consultarTicketCasoUso.execute(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [TicketType])
  async tickets(
    @Args('filtro', { nullable: true }) filtro: TicketFiltroDto,
  ): Promise<TicketType[]> {
    const tickets = await this.consultarTicketsFiltroCasoUso.execute(filtro);
    return tickets.map(mapTicketToTicketType);
  }
}
