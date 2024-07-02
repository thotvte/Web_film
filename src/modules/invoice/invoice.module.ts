import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/entities/invoice.entity';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceDetail } from 'src/entities/invoiceDetail';
import { Products } from 'src/entities/product.entity';
import { Ticket } from 'src/entities/ticket.entity';
import { Seat } from 'src/entities/seat.entity';
import { Schedules } from 'src/entities/schedule.entity';
import { PriceSeatSchedules } from 'src/entities/priceSeatSchedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      InvoiceDetail,
      Products,
      Ticket,
      Seat,
      Schedules,
      PriceSeatSchedules,
    ]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
