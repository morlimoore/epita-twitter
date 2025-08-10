import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().default('your-super-secret-jwt-key-change-this-in-production'),
      }),
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'epita-twitter.db',
      autoLoadEntities: true, // models will be loaded automatically,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
