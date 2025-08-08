import { IsOptional, IsString, IsUrl, IsDateString, Length, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    displayName?: string;

    @IsOptional()
    @IsString()
    @Length(0, 160)
    bio?: string;

    @IsOptional()
    @IsString()
    @Length(0, 100)
    location?: string;

    @IsOptional()
    @IsUrl()
    website?: string;

    @IsOptional()
    @IsDateString()
    dateOfBirth?: string;

    @IsOptional()
    @IsString()
    username?: string;
} 