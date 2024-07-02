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
import { TypeSeatService } from './typeseat.service';
import { InsertTypeSeatDto } from './dto/request/insert-typeseat.dto';
import { Public } from '../auth/auth.setmetadata';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/typeseats')
export class TypeSeatController {
  constructor(private typeSeatService: TypeSeatService) {}

  @Public()
  @Get('/:id')
  getTypeSeat(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.typeSeatService.getTypeSeat(id);
  }

  @Public()
  @Get()
  getTypeSeats() {
    return this.typeSeatService.getTypeSeats();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  insertTypeSeat(@Body() body: InsertTypeSeatDto) {
    return this.typeSeatService.addTypeSeat(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateTypeSeat(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertTypeSeatDto,
  ) {
    return this.typeSeatService.updateTypeSeat(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteTypeSeat(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.typeSeatService.deleteTypeSeat(id);
  }
}
