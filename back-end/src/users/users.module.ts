import { Module } from '@nestjs/common';
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }