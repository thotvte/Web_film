import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountCus } from 'src/entities/accountCus.entity';
import { AccountCusController } from './accountCus.controllert';
import { AccountCusService } from './accountCus.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountCus])],
  controllers: [AccountCusController],
  providers: [AccountCusService],
  exports: [AccountCusService],
})
export class AccountCusModule {}
