import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSeat } from 'src/entities/typeSeat';
import { TypeSeatController } from './typeseat.controller';
import { TypeSeatService } from './typeseat.service';
import { Seat } from 'src/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeSeat, Seat])],
  controllers: [TypeSeatController],
  providers: [TypeSeatService],
})
export class TypeSeatModule {}
