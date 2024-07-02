import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryBill } from 'src/entities/deliveryBill.entity';
import { DeliveryBillController } from './deliveryBill.controller';
import { DeliveryBillService } from './deliveryBill.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryBill])],
  controllers: [DeliveryBillController],
  providers: [DeliveryBillService],
})
export class DeliveryBillModule {}
