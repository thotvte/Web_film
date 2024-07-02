import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import database from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import modules from './modules';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/authorization/roles.guard';
import { AuthGuard } from './modules/auth/auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration, database], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (
        configService: ConfigService, //cu phap nay vi trong do chi co retun nen dung dc
      ) => configService.get('database'),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
