import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryBillDetail } from 'src/entities/deliveryBillDetail.entity';
import { Repository } from 'typeorm';
import { InsertDeliveryBillDetailDto } from './dto/request/insert-deliveryBillDetail.dto';
import { InsertDeliveryBillDetailResponse } from './dto/response/insert-deliveryBillDetail.dto';

@Injectable()
export class DeliveryBillDetailService {
  constructor(
    @InjectRepository(DeliveryBillDetail)
    private deliveryBillDetailReponsitory: Repository<DeliveryBillDetail>,
  ) {}

  async getDeliveryBillDetail(id: number) {
    const result = await this.deliveryBillDetailReponsitory.findOne({
      where: { id },
      relations: ['deliveryBill', 'productItem'],
    });
    return result;
  }

  async getDeliveryBillDetails() {
    return this.deliveryBillDetailReponsitory.find({
      relations: ['deliveryBill', 'productItem'],
    });
  }

  async addDeliveryBillDetail(
    data: InsertDeliveryBillDetailDto,
  ): Promise<InsertDeliveryBillDetailResponse> {
    this.deliveryBillDetailReponsitory.create(data);
    const saveDeliveryBillDetail =
      await this.deliveryBillDetailReponsitory.save(data);
    return saveDeliveryBillDetail;
  }

  async updateDeliveryBillDetail(
    id: number,
    data: InsertDeliveryBillDetailDto,
  ): Promise<string> {
    const getId = await this.deliveryBillDetailReponsitory.findOne({
      where: { id },
    });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy seat với id ${id}`);
    }
    const update = this.deliveryBillDetailReponsitory.merge(getId, data);
    await this.deliveryBillDetailReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteDeliveryBillDetail(id: number): Promise<string> {
    await this.deliveryBillDetailReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
