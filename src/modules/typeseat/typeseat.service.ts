import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeSeat } from 'src/entities/typeSeat';
import { Repository } from 'typeorm';
import { InsertTypeSeatResponse } from './dto/response/insert-typeseat.dto';
import { InsertTypeSeatDto } from './dto/request/insert-typeseat.dto';
import { Seat } from 'src/entities/seat.entity';

@Injectable()
export class TypeSeatService {
  constructor(
    @InjectRepository(TypeSeat)
    private typeSeatRepository: Repository<TypeSeat>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async getTypeSeat(id: number) {
    const result = await this.typeSeatRepository.findOne({
      where: { id },
      relations: ['seats'],
    });
    return result;
  }

  async getTypeSeats(): Promise<TypeSeat[]> {
    return this.typeSeatRepository.find({ relations: ['seats'] });
  }

  async addTypeSeat(data: InsertTypeSeatDto): Promise<InsertTypeSeatResponse> {
    const newTypeSeat = this.typeSeatRepository.create(data);
    const saveTypeSeat = await this.typeSeatRepository.save(newTypeSeat);
    return saveTypeSeat;
  }

  async updateTypeSeat(id: number, data: InsertTypeSeatDto): Promise<string> {
    const getId = await this.typeSeatRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy typeseat với id ${id}`);
    }
    const update = this.typeSeatRepository.merge(getId, data);
    await this.typeSeatRepository.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteTypeSeat(id: number): Promise<string> {
    await this.typeSeatRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
