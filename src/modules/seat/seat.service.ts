import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from 'src/entities/seat.entity';
import { Repository } from 'typeorm';
import { InsertSeatDto } from './dto/request/insert-seat.dto';
import { InsertSeatReponse } from './dto/response/insert-seat.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatReponsitory: Repository<Seat>,
  ) {}

  async getSeat(id: number) {
    const result = await this.seatReponsitory.findOne({
      where: { id },
      relations: ['typeSeat', 'cinema'],
    });
    return result;
  }

  async getSeats() {
    return this.seatReponsitory.find({
      relations: ['typeSeat', 'cinema'],
    });
  }

  async addSeat(data: InsertSeatDto): Promise<InsertSeatReponse> {
    this.seatReponsitory.create(data);
    const saveSeat = await this.seatReponsitory.save(data);
    return saveSeat;
  }

  async updateSeat(id: number, data: InsertSeatDto): Promise<string> {
    const getId = await this.seatReponsitory.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy seat với id ${id}`);
    }
    const update = this.seatReponsitory.merge(getId, data);
    await this.seatReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteSeat(id: number): Promise<string> {
    await this.seatReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
