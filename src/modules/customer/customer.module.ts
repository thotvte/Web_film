import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.servicer';
import { AccountCus } from 'src/entities/accountCus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, AccountCus])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
