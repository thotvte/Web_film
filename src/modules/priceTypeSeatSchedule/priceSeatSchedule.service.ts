import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceSeatSchedules } from 'src/entities/priceSeatSchedule.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InsertPTSSDto } from './dto/request/insert-PTSS.dto';
import { InsertPTSSResponse } from './dto/response/insert-PTSS.dto';

@Injectable()
export class PriceSeatSchedulesServicer {
  constructor(
    @InjectRepository(PriceSeatSchedules)
    private priceSeatSchedulesReponsitory: Repository<PriceSeatSchedules>,
  ) {}

  async getPTSSById(id: number) {
    const result = await this.priceSeatSchedulesReponsitory.findOne({
      where: { id },
      relations: ['schedules', 'seat'],
    });
    return result;
  }

  async getPTSSs(): Promise<InsertPTSSResponse[]> {
    const result = await this.priceSeatSchedulesReponsitory.find({
      relations: ['schedules', 'seat'],
    });
    return result;
  }

  async addPTSS(data: InsertPTSSDto): Promise<InsertPTSSResponse> {
    const newPTSS = await this.priceSeatSchedulesReponsitory.create(data);
    const savePTSS = await this.priceSeatSchedulesReponsitory.save(newPTSS);
    return savePTSS;
  }

  async updatePTSSById(id: number, data: InsertPTSSDto): Promise<string> {
    const getId = await this.priceSeatSchedulesReponsitory.findOne({
      where: { id },
    });
    if (!getId) {
      throw new NotFoundException(`Không tìm thấy PTSS với id ${id}`);
    }
    const update = await this.priceSeatSchedulesReponsitory.merge(getId, data);
    await this.priceSeatSchedulesReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async deletePTSSById(id: number): Promise<string> {
    await this.priceSeatSchedulesReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
