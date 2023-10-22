import { Controller, Get, Query } from '@nestjs/common';
import { ObtenerMensajeCasoUso } from 'src/aplicacion/casos-uso/obtener-mensaje.caso-uso';

@Controller('mensaje')
export class MensajeController {
  constructor(private readonly obtenerMensajeCasoUso: ObtenerMensajeCasoUso) {}

  @Get()
  obtener(@Query('data') data: string): string {
    return this.obtenerMensajeCasoUso.obtenerMensaje(data);
  }
}
