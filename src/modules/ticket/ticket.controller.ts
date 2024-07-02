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
import { TicketService } from './ticket.service';
import { InsertTicketCusDto } from './dto/request/insert-ticketCus.dto';
import { Public } from '../auth/auth.setmetadata';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Public()
  @Get('/:id')
  getTicket(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.ticketService.getTicket(id);
  }

  @Public()
  @Get('')
  getTickets() {
    return this.ticketService.getTickets();
  }

  @UseGuards(AuthGuard)
  @Post('')
  InsertTicketDto(@Body() body: InsertTicketCusDto) {
    return this.ticketService.addTicketCus(body);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  updateTicket(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() body: InsertTicketCusDto,
  ) {
    return this.ticketService.updateTicket(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteTicket(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.ticketService.deleteTicket(id);
  }
}
