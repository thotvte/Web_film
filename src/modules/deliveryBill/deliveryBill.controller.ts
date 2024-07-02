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
import { DeliveryBillService } from './deliveryBill.service';
import { InsertDeliveryBillDto } from './dto/request/insert-deliveryBill.dto';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';

@Controller('/deliverybill')
export class DeliveryBillController {
  constructor(private deliveryBillService: DeliveryBillService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('/:id')
  getGenre(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.deliveryBillService.getSDeliveryBill(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('')
  getGenres() {
    return this.deliveryBillService.getDeliveryBills();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  insertGenre(@Body() body: InsertDeliveryBillDto) {
    return this.deliveryBillService.addDeliveryBill(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateGenre(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertDeliveryBillDto,
  ) {
    return this.deliveryBillService.updateDeliveryBill(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  deleteGenre(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.deliveryBillService.deleteDeliveryBill(id);
  }
}
