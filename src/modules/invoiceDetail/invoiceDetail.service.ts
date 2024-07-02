import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Invoice } from 'src/entities/invoice.entity';
import { InvoiceDetail } from 'src/entities/invoiceDetail';
import { Products } from 'src/entities/product.entity';
import { Supplier } from 'src/entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceDetailService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async getInvoiceDetail(id: number) {
    const result = await this.invoiceDetailRepository.findOne({
      where: {
        id,
      },
      relations: ['invoice'],
    });
    return result;
  }

  async getInvoiceDetails() {
    return this.invoiceDetailRepository.find({
      relations: ['invoice'],
    });
  }
}
