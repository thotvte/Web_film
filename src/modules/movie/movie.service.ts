// movie.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movies } from 'src/entities/movie.entity';
import { Genres } from 'src/entities/genres.entity';
import { InsertMovieDto } from './dto/request/insert-movie.dto';
import { InsertMovieResponse } from './dto/response/insert-movie.dto';
import { Schedules } from 'src/entities/schedule.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
    @InjectRepository(Genres)
    private genreRepository: Repository<Genres>,
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}

  async getMovie(id: number) {
    const result = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['genres', 'schedules'],
    });
    return result;
  }

  async getMovies(): Promise<Movies[]> {
    return this.movieRepository.find({ relations: ['genres', 'schedules'] });
  }

  async addMovie(data: InsertMovieDto): Promise<InsertMovieResponse> {
    const { genreIds, ...rest } = data;
    const newMovie = this.movieRepository.create(rest);
    const genres = await this.genreRepository.find({
      where: { id: In(genreIds) },
    });
    newMovie.genres = genres;
    const saveMovie = await this.movieRepository.save(newMovie);
    return saveMovie;
  }

  async updateMovie(id: number, data: InsertMovieDto): Promise<string> {
    const getId = await this.movieRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy movie với id ${id}`);
    }
    const update = this.movieRepository.merge(getId, data);
    if (data.genreIds) {
      const genres = await this.genreRepository.find({
        where: { id: In(data.genreIds) },
      });
      update.genres = genres;
    }
    await this.movieRepository.save(update);
    return 'Đã cập nhật thành công';
  }

  async deleteMovie(id: number): Promise<string> {
    await this.movieRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
