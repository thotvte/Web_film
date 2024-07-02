import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from 'src/entities/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Genres } from 'src/entities/genres.entity';
import { Schedules } from 'src/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movies, Genres, Schedules])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
