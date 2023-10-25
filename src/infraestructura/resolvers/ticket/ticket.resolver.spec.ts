import { Test, TestingModule } from '@nestjs/testing';
import { TicketResolver } from './ticket.resolver';
import { CrearTicketCasoUso } from 'src/aplicacion/casos-uso/crear-ticket.caso-uso';
import { ConsultarTicketCasoUso } from 'src/aplicacion/casos-uso/consultar-ticket.caso-uso';
import { ConsultarTicketsFiltroCasoUso } from 'src/aplicacion/casos-uso/consultar-tickets-filtro.caso-uso';
import { CreateTicketDto } from 'src/aplicacion/dtos/create-ticket-dto';

describe('TicketResolver', () => {
  let resolver: TicketResolver;
  let mockCrearTicket: jest.Mock;
  let mockConsultarTicket: jest.Mock;
  let mockConsultarTicketsFiltro: jest.Mock;

  beforeEach(async () => {
    mockCrearTicket = jest.fn();
    mockConsultarTicket = jest.fn();
    mockConsultarTicketsFiltro = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketResolver,
        { provide: CrearTicketCasoUso, useValue: { execute: mockCrearTicket } },
        {
          provide: ConsultarTicketCasoUso,
          useValue: { execute: mockConsultarTicket },
        },
        {
          provide: ConsultarTicketsFiltroCasoUso,
          useValue: { execute: mockConsultarTicketsFiltro },
        },
      ],
    }).compile();

    resolver = module.get<TicketResolver>(TicketResolver);
  });

  it('por definir', () => {
    expect(resolver).toBeDefined();
  });

  describe('crearTicket', () => {
    it('por llamar a CrearTicketCasoUso y retorne un ticket', async () => {
      const ticketInput: CreateTicketDto = {
        title: 'Ticket Test',
        description: 'Este es un ticket de test',
        priority: 'medium',
        category: 'support',
        status: 'pending',
      };
      const expectedTicket = {
        id: 'abc123',
        title: 'Ticket Test',
        description: 'Este es un ticket de test',
        priority: 'medium',
        category: 'support',
        status: 'pending',
      };

      mockCrearTicket.mockReturnValueOnce(expectedTicket);

      const result = await resolver.crearTicket(ticketInput);
      expect(mockCrearTicket).toHaveBeenCalledWith(ticketInput);
      expect(result).toEqual(expectedTicket);
    });
  });

  describe('consultarTicket', () => {
    it('por llamar ConsultarTicketCasoUso y retornar ticket', async () => {
      const ticketId = 'abc123';
      const expectedTicket = {
        id: 'abc123',
        title: 'Ticket Test',
        description: 'Este es un ticket de test',
        priority: 'medium',
        category: 'support',
        status: 'pending',
      };

      mockConsultarTicket.mockReturnValueOnce(expectedTicket);

      const result = await resolver.consultarTicket(ticketId);
      expect(mockConsultarTicket).toHaveBeenCalledWith(ticketId);
      expect(result).toEqual(expectedTicket);
    });
  });

  describe('tickets', () => {
    it('por llamar ConsultarTicketsFiltroCasoUso y retornar una lista de tickets', async () => {
      const filtro = { priority: 'medium' as const };
      const expectedTickets = [
        {
          id: 'abc123',
          title: 'Ticket Test 1',
          description: 'Este es un ticket de test 1',
          priority: 'medium',
          category: 'support',
          status: 'pending',
        },
        {
          id: 'def456',
          title: 'Ticket Test 2',
          description: 'Este es un ticket de test 2',
          priority: 'medium',
          category: 'error',
          status: 'verified',
        },
      ];

      mockConsultarTicketsFiltro.mockReturnValueOnce(expectedTickets);

      const result = await resolver.tickets(filtro);
      expect(mockConsultarTicketsFiltro).toHaveBeenCalledWith(filtro);
      expect(result).toEqual(expectedTickets);
    });
  });
});
