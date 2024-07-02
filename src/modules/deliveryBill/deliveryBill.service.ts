import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryBill } from 'src/entities/deliveryBill.entity';
import { Repository } from 'typeorm';
import { InsertDeliveryBillResponse } from './dto/response/insert-deliveryBill.dto';
import { InsertDeliveryBillDto } from './dto/request/insert-deliveryBill.dto';

@Injectable()
export class DeliveryBillService {
  constructor(
    @InjectRepository(DeliveryBill)
    private deliveryBillReponsitory: Repository<DeliveryBill>,
  ) {}

  async getSDeliveryBill(id: number) {
    const result = await this.deliveryBillReponsitory.findOne({
      where: { id },
      relations: ['deliveryBillDetails', 'employee'],
    });
    return result;
  }

  async getDeliveryBills() {
    return this.deliveryBillReponsitory.find({
      relations: ['deliveryBillDetails', 'employee'],
    });
  }

  async addDeliveryBill(
    data: InsertDeliveryBillDto,
  ): Promise<InsertDeliveryBillResponse> {
    this.deliveryBillReponsitory.create(data);
    const saveDeliveryBill = await this.deliveryBillReponsitory.save(data);
    return saveDeliveryBill;
  }

  async updateDeliveryBill(
    id: number,
    data: InsertDeliveryBillDto,
  ): Promise<string> {
    const getId = await this.deliveryBillReponsitory.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(
        `không tìm thấy DeliveryBilleat với id ${id}`,
      );
    }
    const update = this.deliveryBillReponsitory.merge(getId, data);
    await this.deliveryBillReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteDeliveryBill(id: number): Promise<string> {
    await this.deliveryBillReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
