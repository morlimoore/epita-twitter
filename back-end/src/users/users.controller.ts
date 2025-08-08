import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    UseInterceptors,
    UploadedFiles,
    Request,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Get logged-in user's full profile
    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMyProfile(@Request() req): Promise<UserProfileDto> {
        return this.usersService.getMyProfile(req.user.id);
    }

    // Update logged-in user's profile
    @Put('me')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files', 2))
    async updateMyProfile(
        @Request() req,
        @Body() updateProfileDto: UpdateProfileDto,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
                    new FileTypeValidator({ fileType: '.(jpg|jpeg|png|gif|webp)' }),
                ],
                fileIsRequired: false,
            }),
        ) files?: Express.Multer.File[]
    ): Promise<UserProfileDto> {
        const fileMap = {
            profileImage: files?.find(f => f.fieldname === 'profileImage'),
            coverImage: files?.find(f => f.fieldname === 'coverImage')
        };

        return this.usersService.updateProfile(req.user.id, updateProfileDto, fileMap);
    }

    // Change password endpoint
    @Post('me/change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(
        @Request() req,
        @Body() changePasswordDto: ChangePasswordDto
    ): Promise<{ message: string }> {
        return this.usersService.changePassword(req.user.id, changePasswordDto);
    }

    // Get public profile of any user
    @Get(':userId')
    async getPublicProfile(@Param('userId') userId: string): Promise<UserProfileDto> {
        return this.usersService.getPublicProfile(userId);
    }

    // Get follower count
    @Get(':userId/followersCount')
    async getFollowersCount(@Param('userId') userId: string): Promise<{ followersCount: number }> {
        return this.usersService.getFollowersCount(userId);
    }

    // Get following count
    @Get(':userId/followingCount')
    async getFollowingCount(@Param('userId') userId: string): Promise<{ followingCount: number }> {
        return this.usersService.getFollowingCount(userId);
    }

    // Legacy endpoints (keeping for backward compatibility)
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}