import { CrearTicketKafkaCasoDeUso } from 'src/aplicacion/casos-uso/crear-ticket-kafka.caso-uso';

export class TicketControlador {
  constructor(
    private readonly crearTicketCasoDeUso: CrearTicketKafkaCasoDeUso,
  ) {}

  async crearTicket(req: any, res: any): Promise<any> {
    await this.crearTicketCasoDeUso.execute(req.body);
    return res.status(201).send('Ticket creado');
  }
}
