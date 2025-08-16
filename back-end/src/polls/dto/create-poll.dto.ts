import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    ArrayMinSize,
    ArrayMaxSize,
    Length,
} from 'class-validator';

export class CreatePollDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    tweet_id: string;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(2, { message: 'A poll must have at least 2 options.' })
    @ArrayMaxSize(4, { message: 'A poll can have at most 4 options.' })
    @Length(1, 25, { each: true, message: 'Each option must be between 1 and 25 characters.' })
    options: string[];

    @IsOptional()
    @IsDateString()
    expires_at?: string;
}