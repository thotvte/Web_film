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
import { DeliveryBillDetailService } from './deliveryBillDetail.service';
import { InsertDeliveryBillDetailDto } from './dto/request/insert-deliveryBillDetail.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('/deliverybilldetail')
export class DeliveryBillDetailController {
  constructor(private deliveryBillDetailService: DeliveryBillDetailService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('/:id')
  getDeliveryBillDetail(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.deliveryBillDetailService.getDeliveryBillDetail(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get('')
  getDeliveryBillDetails() {
    return this.deliveryBillDetailService.getDeliveryBillDetails();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  insertSeat(@Body() body: InsertDeliveryBillDetailDto) {
    return this.deliveryBillDetailService.addDeliveryBillDetail(body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  updateDeliveryBillDetail(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertDeliveryBillDetailDto,
  ) {
    return this.deliveryBillDetailService.updateDeliveryBillDetail(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteDeliveryBillDetail(
    @Param('id', { transform: (value) => Number(value) }) id: number,
  ) {
    return this.deliveryBillDetailService.deleteDeliveryBillDetail(id);
  }
}
