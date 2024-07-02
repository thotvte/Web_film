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
import { GenreService } from './genre.service';
import { InsertGenreDto } from './dto/request/insert-genre.dto';
import { Public } from '../auth/auth.setmetadata';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/genres')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Public()
  @Get('/:id')
  getGenre(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.genreService.getGenre(id);
  }

  @Public()
  @Get('')
  getGenres() {
    return this.genreService.getGenres();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  insertGenre(@Body() body: InsertGenreDto) {
    return this.genreService.addGenre(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateGenre(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertGenreDto,
  ) {
    return this.genreService.updateGenre(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  deleteGenre(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.genreService.deleteGenre(id);
  }
}
