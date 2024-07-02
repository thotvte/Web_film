import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from 'src/entities/cinema.entity';
import { In, Repository } from 'typeorm';
import { InsertCinemaResponse } from './dto/response/insert-cinema.dto';
import { InsertCinemaDto } from './dto/request/insert-cinema.dto';
import { Seat } from 'src/entities/seat.entity';
import { Schedules } from 'src/entities/schedule.entity';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private cinemaReponsitory: Repository<Cinema>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Schedules)
    private scheduleRepository: Repository<Schedules>,
  ) {}

  async getCinema(id: number) {
    const result = await this.cinemaReponsitory.findOne({
      where: {
        id,
      },
      relations: ['seats', 'schedules'],
    });
    return result;
  }

  async getCinemas() {
    const result = await this.cinemaReponsitory.find({
      relations: ['seats', 'schedules'],
    });
    return result;
  }

  async addCinema(data: InsertCinemaDto): Promise<InsertCinemaResponse> {
    const { seatIds, scheduleIds, ...rest } = data;
    const newCinema = this.cinemaReponsitory.create(rest);
    const seats = await this.seatRepository.find({
      where: { id: In(seatIds) },
    });
    const schedules = await this.scheduleRepository.find({
      where: { id: In(scheduleIds) },
    });
    newCinema.schedules = schedules;
    newCinema.seats = seats;
    const saveTypeSeat = await this.cinemaReponsitory.save(newCinema);
    return saveTypeSeat;
  }

  async updateCinema(id: number, data: InsertCinemaDto): Promise<string> {
    const getId = await this.cinemaReponsitory.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy movie với id ${id}`);
    }
    const update = this.cinemaReponsitory.merge(getId, data);
    if (data.seatIds) {
      const seats = await this.seatRepository.find({
        where: { id: In(data.seatIds) },
      });
      update.seats = seats;
    }
    if (data.scheduleIds) {
      const schedules = await this.scheduleRepository.find({
        where: { id: In(data.scheduleIds) },
      });
      update.schedules = schedules;
    }
    await this.cinemaReponsitory.save(update);
    return 'Đã cập nhật thành công';
  }

  async deleteCinema(id: number): Promise<string> {
    await this.cinemaReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
