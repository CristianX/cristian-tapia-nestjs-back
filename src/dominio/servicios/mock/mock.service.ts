// src/mock/mock.service.ts
import { Injectable } from '@nestjs/common';
import { ObtenerEstadoServicio } from 'src/aplicacion/casos-uso/obtener-estado-servicio.caso-uso';
import { MockResponseDto } from 'src/aplicacion/dtos/mock-response.dto';

@Injectable()
export class MockService {
  constructor(private obtenerEstadoServicio: ObtenerEstadoServicio) {}

  async getServiceState(id: number): Promise<MockResponseDto> {
    return this.obtenerEstadoServicio.execute(id);
  }
}
