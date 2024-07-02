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
import { CinemaService } from './cinema.service';
import { InsertCinemaDto } from './dto/request/insert-cinema.dto';
import { Public } from '../auth/auth.setmetadata';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/cinemas')
export class CinemaController {
  constructor(private cinemaService: CinemaService) {}

  @Public()
  @Get('/:id')
  getCinema(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.cinemaService.getCinema(id);
  }

  @Public()
  @Get()
  getCinemas() {
    return this.cinemaService.getCinemas();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  addCinema(@Body() body: InsertCinemaDto) {
    return this.cinemaService.addCinema(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateCinema(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertCinemaDto,
  ) {
    return this.cinemaService.updateCinema(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteCinema(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.cinemaService.deleteCinema(id);
  }
}
