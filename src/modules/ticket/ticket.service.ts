import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/entities/ticket.entity';
import { Repository } from 'typeorm';
import { InsertTicketCusDto } from './dto/request/insert-ticketCus.dto';
import { InsertTicketCusResponse } from './dto/response/insert-ticketCus.dto';
import { Movies } from 'src/entities/movie.entity';
import { Seat } from 'src/entities/seat.entity';
import { TypeSeat } from 'src/entities/typeSeat';
import { Schedules } from 'src/entities/schedule.entity';
import { PriceSeatSchedules } from 'src/entities/priceSeatSchedule.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketReponsitory: Repository<Ticket>,
    @InjectRepository(Movies)
    private movieReponsitory: Repository<Movies>,
    @InjectRepository(Seat)
    private seatReponsitory: Repository<Seat>,
    @InjectRepository(TypeSeat)
    private typeSeatReponsitory: Repository<TypeSeat>,
    @InjectRepository(Schedules)
    private schedulesReponsitory: Repository<Schedules>,
    @InjectRepository(PriceSeatSchedules)
    private PtssReponsitory: Repository<PriceSeatSchedules>,
  ) {}

  async getTicket(id: number) {
    const result = await this.ticketReponsitory.findOne({
      where: { id },
      relations: ['seat', 'schedules'],
    });
    return result;
  }

  async getTickets() {
    const result = this.ticketReponsitory.find({
      relations: ['seat', 'schedules'],
    });
    console.log(result);
    return result;
  }

  async addTicketCus(
    dataCus: InsertTicketCusDto,
  ): Promise<InsertTicketCusResponse> {
    const seat = await this.seatReponsitory.find({
      where: { id: dataCus.seatId },
      relations: ['typeSeat'],
    });
    if (!seat) {
      throw new Error(`ID ghế : ${dataCus.seatId} hiện không tồn tại`);
    }

    const schedule = await this.schedulesReponsitory.findOne({
      where: { id: dataCus.schedulesId },
      relations: ['cinema', 'movie'],
    });
    if (!schedule) {
      throw new Error(
        `ID lịch chiếu : ${dataCus.schedulesId} hiện không tồn tại`,
      );
    }

    const priceTypeSeatSchedule = await this.PtssReponsitory.findOne({
      where: {
        schedulesId: dataCus.schedulesId,
        SeatId: dataCus.seatId,
      },
    });

    const newTicket = this.ticketReponsitory.create({
      ...dataCus,
      nameMovie: schedule.movie.name,
      schedule: schedule.startTime,
      unitPrice: priceTypeSeatSchedule.price,
      total: priceTypeSeatSchedule.price * 1,
    });
    const saveticket = await this.ticketReponsitory.save(newTicket);
    return saveticket;
  }

  async updateTicket(id: number, data: InsertTicketCusDto): Promise<string> {
    const getId = await this.ticketReponsitory.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy ticket với id ${id}`);
    }
    const update = this.ticketReponsitory.merge(getId, data);
    await this.ticketReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteTicket(id: number): Promise<string> {
    await this.ticketReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
