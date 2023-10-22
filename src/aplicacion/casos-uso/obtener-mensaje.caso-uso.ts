import { Injectable } from '@nestjs/common';
import { IMensaje } from 'src/dominio/interfaces/mensaje/mensaje.interface';

@Injectable()
export class ObtenerMensajeCasoUso implements IMensaje {
  obtenerMensaje(data: string): string {
    if (data == 'Hola') {
      return 'Bienvenido!';
    }
    return 'Mensaje no reconocido';
  }
}
