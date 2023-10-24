// src/mock/use-cases/obtain-service-state.usecase.ts
import { Injectable } from '@nestjs/common';
import { MockResponseDto } from '../dtos/mock-response.dto';

@Injectable()
export class ObtenerEstadoServicio {
  async execute(id: number): Promise<MockResponseDto> {
    const states = [604, 606, 607];
    const randomState = states[Math.floor(Math.random() * states.length)];

    return new MockResponseDto(id, randomState);
  }
}
