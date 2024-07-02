import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { InsertMovieDto } from './dto/request/insert-movie.dto';
import { Public } from '../auth/auth.setmetadata';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Public()
  @Get('/:id')
  getMovie(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.movieService.getMovie(id);
  }

  @Public()
  @Get('')
  getMovies() {
    return this.movieService.getMovies();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  insertMovie(@Body() body: InsertMovieDto) {
    return this.movieService.addMovie(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateMovie(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertMovieDto,
  ) {
    return this.movieService.updateMovie(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  deleteMovie(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.movieService.deleteMovie(id);
  }
}
