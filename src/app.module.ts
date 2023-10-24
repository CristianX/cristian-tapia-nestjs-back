import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajeController } from './infraestructura/controladores/mensaje/mensaje.controller';
import * as fs from 'fs';
import { ObtenerMensajeCasoUso } from './aplicacion/casos-uso/obtener-mensaje.caso-uso';
import { TicketService } from './dominio/servicios/ticket/ticket.service';
import { TicketController } from './infraestructura/controladores/ticket/ticket.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { TicketResolver } from './infraestructura/resolvers/ticket/ticket.resolver';
import { CrearTicketCasoUso } from './aplicacion/casos-uso/crear-ticket.caso-uso';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './infraestructura/resolvers/app/app.resolver';
import { Ticket } from './dominio/entidades/ticket.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './infraestructura/filtros/http-exception/http-exception.filter';
import { ConsultarTicketCasoUso } from './aplicacion/casos-uso/consultar-ticket.caso-uso';
import { ConsultarTicketsFiltroCasoUso } from './aplicacion/casos-uso/consultar-tickets-filtro.caso-uso';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          entities: [Ticket],
          synchronize: true, //Desactivar en prod
          // ssl: true,
          extra: {
            ssl: { rejectUnauthorized: false },
            ca: fs.readFileSync(process.env.CA_CERT_PATH).toString(),
          },
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController, MensajeController, TicketController],
  providers: [
    AppService,
    ObtenerMensajeCasoUso,
    TicketService,
    TicketResolver,
    CrearTicketCasoUso,
    AppResolver,
    ConsultarTicketCasoUso,
    ConsultarTicketsFiltroCasoUso,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
