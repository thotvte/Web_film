import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { InsertPermissionDto } from './dto/request/insert-permission.dto';
import { Public } from '../auth/auth.setmetadata';

@Controller('/permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Public()
  @Get('/:id')
  getPer(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.permissionService.getPer(id);
  }

  @Public()
  @Get('')
  getPers() {
    return this.permissionService.getPers();
  }

  @Public()
  @Post('')
  insertPer(@Body() body: InsertPermissionDto) {
    return this.permissionService.addPer(body);
  }

  @Public()
  @Put('/:id')
  updatePer(
    @Param('id', { transform: (value) => Number(value) }) id: number,
    @Body() data: InsertPermissionDto,
  ) {
    return this.permissionService.updatePer(id, data);
  }

  @Public()
  @Delete('/:id')
  deletePer(@Param('id', { transform: (value) => Number(value) }) id: number) {
    return this.permissionService.deletePer(id);
  }
}
