import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservetaionsSchema,
} from './models/reservation.schema';

@Module({
  imports: [
    LoggerModule.forRoot({pinoHttp: {}}),
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservetaionsSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
