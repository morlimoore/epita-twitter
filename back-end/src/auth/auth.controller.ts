import { Body, Controller, Post, UnauthorizedException, HttpCode, HttpStatus, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: { email: string; password: string }) {
        try {
            return await this.authService.login(loginDto.email, loginDto.password);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException('Login failed');
        }
    }

    @Get('keycloak')
    @UseGuards(AuthGuard('keycloak'))
    async keycloakAuth() {
        // This will redirect to Keycloak
    }

    @Get('keycloak/callback')
    @UseGuards(AuthGuard('keycloak'))
    async keycloakCallback(@Req() req: Request, @Res() res: Response) {
        // Handle the callback from Keycloak
        const user = req.user as any;
        
        // Store user in session or create JWT
        const token = this.authService.createTokenFromKeycloakUser(user);
        
        // Redirect to frontend with token
        res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
    }

    @Get('profile')
    @UseGuards(AuthGuard('keycloak-jwt'))
    getProfile(@Req() req: Request) {
        return req.user;
    }
}
