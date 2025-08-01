import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from "./entities/user.entity";

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

    async findOne(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }

    async findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        return this.userRepository.delete(id);
    }

}