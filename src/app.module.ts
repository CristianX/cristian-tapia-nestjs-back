import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajeController } from './infraestructura/controladores/mensaje/mensaje.controller';
import * as fs from 'fs';
import { ObtenerMensajeCasoUso } from './aplicacion/casos-uso/obtener-mensaje.caso-uso';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          url: process.env.DATABASE_URL,
          entities: [],
          synchronize: true, //Desactivar en prod
          // ssl: true,
          extra: {
            ssl: { rejectUnauthorized: false },
            ca: fs.readFileSync(process.env.CA_CERT_PATH).toString(),
          },
        };
      },
    }),
  ],
  controllers: [AppController, MensajeController],
  providers: [AppService, ObtenerMensajeCasoUso],
})
export class AppModule {}
