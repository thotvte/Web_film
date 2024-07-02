import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedules } from 'src/entities/schedule.entity';
import { SchedulesService } from './schedule.service';
import { scheduleController } from './schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schedules])],
  controllers: [scheduleController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
