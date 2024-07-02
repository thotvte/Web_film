import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genres } from 'src/entities/genres.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { Movies } from 'src/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genres, Movies])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
