import { Test, TestingModule } from '@nestjs/testing';
import { TicketKafkaController } from './ticket-kafka.controller';

describe('TicketKafkaController', () => {
  let controller: TicketKafkaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketKafkaController],
    }).compile();

    controller = module.get<TicketKafkaController>(TicketKafkaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
