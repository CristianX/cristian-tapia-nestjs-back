// src/mock/mock.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MockResponseDto } from 'src/aplicacion/dtos/mock-response.dto';
import { MockService } from 'src/dominio/servicios/mock/mock.service';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get(':id/state')
  async getServiceState(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MockResponseDto> {
    return this.mockService.getServiceState(id);
  }
}
