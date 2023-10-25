import { Test, TestingModule } from '@nestjs/testing';
import { TicketsKafkaService } from 'src/dominio/servicios/ticket-kafka/ticket-kafka.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket } from 'src/dominio/entidades/ticket.entity';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CreateTicketDto } from 'src/aplicacion/dtos/create-ticket-dto';
import { KafkaService } from 'src/infraestructura/kafka/kafka/kafka.service';

describe('TicketsKafkaService', () => {
  let service: TicketsKafkaService;
  let mockRepository: any;
  let mockKafkaService: any;
  let mockHttpService: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    mockKafkaService = {
      enviarMensaje: jest.fn(),
    };

    mockHttpService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsKafkaService,
        {
          provide: getRepositoryToken(Ticket),
          useValue: mockRepository,
        },
        {
          provide: KafkaService,
          useValue: mockKafkaService,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<TicketsKafkaService>(TicketsKafkaService);
  });

  it('por definir', () => {
    expect(service).toBeDefined();
  });

  it('por crear ticket con la categoría "incident"', async () => {
    mockRepository.create.mockReturnValue({});
    mockHttpService.get.mockReturnValue(
      of({
        status: 200,
        data: {},
      }),
    );

    const dto: CreateTicketDto = {
      title: 'Test Incidente',
      description: 'Test Descripcion',
      priority: 'high',
      category: 'incident',
      status: 'pending',
    };

    await service.createTicket(dto);
    expect(mockKafkaService.enviarMensaje).toBeCalled();
    expect(mockRepository.save).toBeCalled();
  });
});
