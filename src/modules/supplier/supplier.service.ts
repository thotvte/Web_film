import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity';
import { Repository } from 'typeorm';
import { InsertSupplierDto } from './dto/request/insert-supplier.dto';
import { InsertSupplierResponse } from './dto/response/insert-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async getSupplier(id: number) {
    const result = await this.supplierRepository.findOne({
      where: { id },
      relations: ['productItems'],
    });
    return result;
  }

  async getSuppliers(): Promise<Supplier[]> {
    return this.supplierRepository.find({ relations: ['productItems'] });
  }

  async addSupplier(data: InsertSupplierDto): Promise<InsertSupplierResponse> {
    await this.supplierRepository.create(data);
    const saveSupplier = await this.supplierRepository.save(data);
    return saveSupplier;
  }

  async updateSupplier(id: number, data: InsertSupplierDto): Promise<string> {
    const getId = await this.supplierRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy Supplier với id ${id}`);
    }
    const update = this.supplierRepository.merge(getId, data);
    await this.supplierRepository.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteSupplier(id: number): Promise<string> {
    await this.supplierRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
