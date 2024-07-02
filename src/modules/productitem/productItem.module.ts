import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItem } from 'src/entities/productIteam.entity';
import { ProductItemController } from './productitem.controller';
import { ProductItemService } from './productitem.service';
import { Category } from 'src/entities/category.entity';
import { Supplier } from 'src/entities/supplier.entity';
import { Products } from 'src/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductItem, Category, Supplier, Products]),
  ],
  controllers: [ProductItemController],
  providers: [ProductItemService],
})
export class ProductItemModule {}
