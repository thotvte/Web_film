import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/entities/ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Movies } from 'src/entities/movie.entity';
import { Seat } from 'src/entities/seat.entity';
import { Schedules } from 'src/entities/schedule.entity';
import { TypeSeat } from 'src/entities/typeSeat';
import { PriceSeatSchedules } from 'src/entities/priceSeatSchedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      Movies,
      Seat,
      Schedules,
      TypeSeat,
      PriceSeatSchedules,
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
