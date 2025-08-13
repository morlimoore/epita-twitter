import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { TweetType } from '../entities/tweet.entity';

export class CreateTweetDto {
    @IsString()
    @IsNotEmpty({ message: 'Tweet content is required' })
    @MaxLength(280, { message: 'Tweet content cannot exceed 280 characters' })
    content: string;

    @IsOptional()
    @IsEnum(TweetType)
    type?: TweetType;
} 