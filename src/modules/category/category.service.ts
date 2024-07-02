import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { InsertCategoryDto } from './dto/request/insert-category.dto';
import { InsertCategoryResponse } from './dto/response/insert-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategory(id: number) {
    const result = await this.categoryRepository.findOne({
      where: { id },
      relations: ['productItems'],
    });
    return result;
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['productItems'],
    });
  }

  async addCategory(data: InsertCategoryDto): Promise<InsertCategoryResponse> {
    await this.categoryRepository.create(data);
    const saveCategory = await this.categoryRepository.save(data);
    return saveCategory;
  }

  async updateCategory(id: number, data: InsertCategoryDto): Promise<string> {
    const getId = await this.categoryRepository.findOne({ where: { id } });
    if (!getId) {
      throw new NotFoundException(`không tìm thấy typeseat với id ${id}`);
    }
    const update = this.categoryRepository.merge(getId, data);
    await this.categoryRepository.save(update);
    return 'đã cập nhật thành công';
  }

  async deleteCategory(id: number): Promise<string> {
    await this.categoryRepository.softRemove({ id });
    return 'đã xóa thành công';
  }
}
