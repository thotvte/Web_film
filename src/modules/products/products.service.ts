import { Injectable, NotFoundException } from '@nestjs/common';
import { InsertProductDto } from './dto/request/insert-products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductItem } from 'src/entities/productIteam.entity';
import { In, Repository } from 'typeorm';
import { Products } from 'src/entities/product.entity';
import { InsertProductResponse } from './dto/response/insert-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductItem)
    private productItemReponsitory: Repository<ProductItem>,
    @InjectRepository(Products)
    private productsReponsitory: Repository<Products>,
  ) {}

  async getProduct(id: number) {
    const result = await this.productsReponsitory.findOne({
      where: { id },
      relations: ['productItems'],
    });
    return result;
  }

  async getProducts() {
    const result = await this.productsReponsitory.find({
      relations: ['productItems'],
    });
    return result;
  }

  async addProduct(data: InsertProductDto): Promise<InsertProductResponse> {
    const { productItemIds, ...rest } = data;
    const newProduct = await this.productsReponsitory.create(rest);
    const productItems = await this.productItemReponsitory.find({
      where: { id: In(productItemIds) },
    });
    newProduct.productItems = productItems;
    const saveProduct = await this.productsReponsitory.save(newProduct);
    return saveProduct;
  }

  async updateProduct(id: number, data: InsertProductDto): Promise<string> {
    const getId = await this.productsReponsitory.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`Không tìm thấy Product với id ${id}`);
    }
    const update = await this.productsReponsitory.merge(getId, data);
    if (data.productItemIds) {
      const productItem = await this.productItemReponsitory.find({
        where: { id: In(data.productItemIds) },
      });
      update.productItems = productItem;
    }
    await this.productsReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteProduct(id: number): Promise<string> {
    await this.productsReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
