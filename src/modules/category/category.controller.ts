import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { InsertCategoryDto } from './dto/request/insert-category.dto';
import { Public } from '../auth/auth.setmetadata';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Public()
  @Get('/:id')
  getCategory(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.categoryService.getCategory(id);
  }

  @Public()
  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  insertTypeSeat(@Body() body: InsertCategoryDto) {
    return this.categoryService.addCategory(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateCategory(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteCategory(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.categoryService.deleteCategory(id);
  }
}
