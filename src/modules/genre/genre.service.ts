import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genres } from 'src/entities/genres.entity';
import { In, Repository } from 'typeorm';
import { InsertGenreResponse } from './dto/response/insert-genre.dto';
import { InsertGenreDto } from './dto/request/insert-genre.dto';
import { Movies } from 'src/entities/movie.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genres)
    private genreRepository: Repository<Genres>,
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
  ) {}

  async getGenre(id: number) {
    const result = await this.genreRepository.findOne({
      where: {
        id,
      },
      relations: ['movies'],
    });
    return result;
  }

  async getGenres() {
    return this.genreRepository.find({ relations: ['movies'] });
  }

  async addGenre(data: InsertGenreDto): Promise<InsertGenreResponse> {
    const { movieIds, ...rest } = data;
    const newGenre = this.genreRepository.create(rest);
    const movies = await this.movieRepository.find({
      where: { id: In(movieIds) },
    });
    newGenre.movies = movies;
    const saveGenre = await this.genreRepository.save(newGenre);
    return saveGenre;
  }

  async updateGenre(id: number, data: InsertGenreDto): Promise<string> {
    const getId = await this.genreRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy genre với id ${id}`);
    }
    const update = this.genreRepository.merge(getId, data);
    if (data.movieIds) {
      const movies = await this.movieRepository.find({
        where: { id: In(data.movieIds) },
      });
      update.movies = movies;
    }
    await this.genreRepository.save(update);
    return 'đã cập nhật thành công ';
  }

  async deleteGenre(id: number): Promise<string> {
    await this.genreRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
