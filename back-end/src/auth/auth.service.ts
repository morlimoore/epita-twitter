import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserMapper } from '../users/mappers/user.mapper';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userMapper: UserMapper,
    ) { }

    async registerUser(createUserDto: CreateUserDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(user);
        
        // Generate JWT token for the new user
        const payload = {
            sub: savedUser.id,
            username: savedUser.username,
            email: savedUser.email
        };
        
        return {
            access_token: this.jwtService.sign(payload),
            user: this.userMapper.toDto(savedUser),
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: this.userMapper.toDto(user),
        };
    }
}
