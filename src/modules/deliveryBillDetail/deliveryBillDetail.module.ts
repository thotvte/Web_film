import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryBillDetail } from 'src/entities/deliveryBillDetail.entity';
import { DeliveryBillDetailController } from './deliveryBillDetail.controller';
import { DeliveryBillDetailService } from './deliveryBillDetail.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryBillDetail])],
  controllers: [DeliveryBillDetailController],
  providers: [DeliveryBillDetailService],
})
export class DeliveryBillDetailModule {}
