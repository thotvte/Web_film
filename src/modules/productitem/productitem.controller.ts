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
import { ProductItemService } from './productitem.service';
import { InsertProductItemDto } from './dto/request/insert-productitem.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/productitem')
export class ProductItemController {
  constructor(private productItemService: ProductItemService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  getTicket(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.productItemService.getProductItem(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('')
  getTickets() {
    return this.productItemService.getProductItems();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  InsertTicketDto(@Body() body: InsertProductItemDto) {
    return this.productItemService.addProductItem(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateTicket(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() body: InsertProductItemDto,
  ) {
    return this.productItemService.updateProductItem(id, body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  deleteTicket(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.productItemService.deleteProductItem(id);
  }
}
