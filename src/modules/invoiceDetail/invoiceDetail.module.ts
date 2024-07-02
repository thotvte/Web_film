import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { InvoiceDetail } from 'src/entities/invoiceDetail';
import { Products } from 'src/entities/product.entity';
import { Supplier } from 'src/entities/supplier.entity';
import { InvoiceDetailController } from './invoiceDetail.controller';
import { InvoiceDetailService } from './invoiceDetail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      InvoiceDetail,
      Products,
      Category,
      Supplier,
    ]),
  ],
  controllers: [InvoiceDetailController],
  providers: [InvoiceDetailService],
})
export class InvoiceDetailModule {}
