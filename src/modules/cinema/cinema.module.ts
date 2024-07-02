import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from 'src/entities/cinema.entity';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { Seat } from 'src/entities/seat.entity';
import { Schedules } from 'src/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema, Seat, Schedules])],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
