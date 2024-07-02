import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceSeatSchedules } from 'src/entities/priceSeatSchedule.entity';
import { PriceSeatSchedulesController } from './priceSeatSchedule.controller';
import { PriceSeatSchedulesServicer } from './priceSeatSchedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([PriceSeatSchedules])],
  controllers: [PriceSeatSchedulesController],
  providers: [PriceSeatSchedulesServicer],
})
export class PriceTypeSeatSchedulesModule {}
