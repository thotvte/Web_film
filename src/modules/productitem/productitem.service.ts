import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { ProductItem } from 'src/entities/productIteam.entity';
import { Supplier } from 'src/entities/supplier.entity';
import { In, Repository } from 'typeorm';
import { InsertProductItemResponse } from './dto/response/insert-productitem.dto';
import { InsertProductItemDto } from './dto/request/insert-productitem.dto';
import { Products } from 'src/entities/product.entity';

@Injectable()
export class ProductItemService {
  constructor(
    @InjectRepository(ProductItem)
    private productItemReponsitory: Repository<ProductItem>,
    @InjectRepository(Category)
    private categoryReponsitory: Repository<Category>,
    @InjectRepository(Supplier)
    private supplierReponsitory: Repository<Supplier>,
    @InjectRepository(Products)
    private productsReponsitory: Repository<Products>,
  ) {}

  async getProductItem(id: number) {
    const result = await this.productItemReponsitory.findOne({
      where: { id },
      relations: ['category', 'supplier', 'products'],
    });
    return result;
  }

  async getProductItems(): Promise<ProductItem[]> {
    const result = await this.productItemReponsitory.find({
      relations: ['category', 'supplier', 'products'],
    });
    return result;
  }

  async addProductItem(
    data: InsertProductItemDto,
  ): Promise<InsertProductItemResponse> {
    const { categoryId, supplierId, productIds, ...rest } = data;
    const newProductItem = await this.productItemReponsitory.create(rest);
    if (data.categoryId) {
      const category = await this.categoryReponsitory.findOne({
        where: { id: categoryId },
      });
      newProductItem.category = category;
    }
    if (data.supplierId) {
      const supplier = await this.supplierReponsitory.findOne({
        where: { id: supplierId },
      });
      newProductItem.supplier = supplier;
    }
    if (data.productIds) {
      const products = await this.productsReponsitory.find({
        where: { id: In(productIds) },
      });
      newProductItem.products = products;
    }
    const saveProductItem =
      await this.productItemReponsitory.save(newProductItem);
    return saveProductItem;
  }

  async updateProductItem(
    id: number,
    data: InsertProductItemDto,
  ): Promise<string> {
    const getId = await this.productItemReponsitory.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`Không tìm thấy ProductItem với id ${id}`);
    }
    const update = await this.productItemReponsitory.merge(getId, data);
    if (data.categoryId) {
      const category = await this.categoryReponsitory.findOne({
        where: { id: data.categoryId },
      });
      update.category = category;
    }
    if (data.supplierId) {
      const supplier = await this.supplierReponsitory.findOne({
        where: { id: data.supplierId },
      });
      update.supplier = supplier;
    }
    if (data.productIds) {
      const product = await this.productsReponsitory.find({
        where: { id: In(data.productIds) },
      });
      update.products = product;
    }
    await this.productItemReponsitory.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteProductItem(id: number): Promise<string> {
    await this.productItemReponsitory.softRemove({ id });
    return 'đã xóa thành công';
  }
}
