import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly dataSource: DataSource,
        private readonly configService: ConfigService,
    ) {
        const databaseHost = this.configService.get<string>('DATABASE_HOST');
        console.log(databaseHost);
    }

    async create(createUserDto: CreateUserDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }

    async findOne(id: string) {
        return this.userRepository.findOne({ where: { id } });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        return this.userRepository.delete(id);
    }

}