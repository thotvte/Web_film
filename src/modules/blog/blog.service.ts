import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';
import { In, Repository } from 'typeorm';
import { InsertBlogCusDto } from './dto/request/insert-blogcus.dto';
import { InsertBlogCusResponse } from './dto/response/insert-blogcus.dto';
import { InsertBlogEmpDto } from './dto/request/insert-blogemp.dto';
import { InsertBlogEmpResponse } from './dto/response/insert-blogemp.dto';
import { UpdateBlogEmpDto } from './dto/request/update-blogemp.dto';
import { Movies } from 'src/entities/movie.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
  ) {}

  async getBlogById(id: number) {
    const result = await this.blogRepository.findOne({
      where: { id },
      relations: ['movies', 'employee', 'customer'],
    });
    return result;
  }

  async getBlogCusById(id: number) {
    const result = await this.blogRepository.findOne({
      where: { id },
      relations: ['movies', 'customer'],
    });
    return result;
  }

  async getBlogEmpById(id: number) {
    const result = await this.blogRepository.findOne({
      where: { id },
      relations: ['movies', 'employee'],
    });
    return result;
  }

  async getBlogs(): Promise<Blog[]> {
    return this.blogRepository.find({
      relations: ['movies', 'employee', 'customer'],
    });
  }

  async addBlogCus(data: InsertBlogCusDto): Promise<InsertBlogCusResponse> {
    const { movieIds, ...rest } = data;
    const newBlog = await this.blogRepository.create(rest);
    const movies = await this.movieRepository.find({
      where: { id: In(movieIds) },
    });
    newBlog.movies = movies;
    const saveBlogCus = await this.blogRepository.save(newBlog);
    return saveBlogCus;
  }

  async addBlogEmp(data: InsertBlogEmpDto): Promise<InsertBlogEmpResponse> {
    const { movieIds, ...rest } = data;
    const newBlog = await this.blogRepository.create(rest);
    const movies = await this.movieRepository.find({
      where: { id: In(movieIds) },
    });
    newBlog.movies = movies;
    const saveBlogEmp = await this.blogRepository.save(newBlog);
    return saveBlogEmp;
  }

  async updateBlogEmp(id: number, data: UpdateBlogEmpDto): Promise<string> {
    const getId = await this.blogRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy Blog với id ${id}`);
    }
    const update = this.blogRepository.merge(getId, data);
    if (data.movieIds) {
      const movies = await this.movieRepository.find({
        where: { id: In(data.movieIds) },
      });
      update.movies = movies;
    }
    await this.blogRepository.save(update);
    return 'đã cập nhật thành công';
  }

  async updateBlogCus(id: number, data: UpdateBlogEmpDto): Promise<string> {
    const getId = await this.blogRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy Blog với id ${id}`);
    }
    const update = this.blogRepository.merge(getId, data);
    if (data.movieIds) {
      const movies = await this.movieRepository.find({
        where: { id: In(data.movieIds) },
      });
      update.movies = movies;
    }
    await this.blogRepository.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteBlog(id: number): Promise<string> {
    await this.blogRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
