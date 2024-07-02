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
import { PriceSeatSchedulesServicer } from './priceSeatSchedule.service';
import { InsertPTSSDto } from './dto/request/insert-PTSS.dto';
import { Roles } from '../authorization/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Role } from '../authorization/role.enum';

@Controller('/ptss')
export class PriceSeatSchedulesController {
  constructor(private PTSSService: PriceSeatSchedulesServicer) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  getSchedule(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.PTSSService.getPTSSById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('')
  getSchedules() {
    return this.PTSSService.getPTSSs();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  insertSchedule(@Body() body: InsertPTSSDto) {
    return this.PTSSService.addPTSS(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateSchedule(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertPTSSDto,
  ) {
    return this.PTSSService.updatePTSSById(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteSchedule(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    await this.PTSSService.deletePTSSById(id);
  }
}
