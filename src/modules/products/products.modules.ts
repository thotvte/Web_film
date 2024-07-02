import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductItem } from 'src/entities/productIteam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductItem])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
