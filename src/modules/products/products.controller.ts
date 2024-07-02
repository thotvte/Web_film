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
import { ProductsService } from './products.service';
import { InsertProductDto } from './dto/request/insert-products.dto';
import { Public } from '../auth/auth.setmetadata';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/product')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get('/:id')
  getProduct(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.productsService.getProduct(id);
  }

  @Public()
  @Get('')
  getProducts() {
    return this.productsService.getProducts();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  InsertProduct(@Body() body: InsertProductDto) {
    return this.productsService.addProduct(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateProduct(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() body: InsertProductDto,
  ) {
    return this.productsService.updateProduct(id, body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  deleteProduct(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.productsService.deleteProduct(id);
  }
}
