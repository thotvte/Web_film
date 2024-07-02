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
import { SeatService } from './seat.service';
import { InsertSeatDto } from './dto/request/insert-seat.dto';
import { Public } from '../auth/auth.setmetadata';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/seats')
export class SeatController {
  constructor(private seatService: SeatService) {}

  @Public()
  @Get('/:id')
  getSeat(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.seatService.getSeat(id);
  }

  @Public()
  @Get('')
  getSeats() {
    return this.seatService.getSeats();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  insertSeat(@Body() body: InsertSeatDto) {
    return this.seatService.addSeat(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateSeat(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertSeatDto,
  ) {
    return this.seatService.updateSeat(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteSeat(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.seatService.deleteSeat(id);
  }
}
