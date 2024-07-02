import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entities/blog.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Movies } from 'src/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Movies])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
