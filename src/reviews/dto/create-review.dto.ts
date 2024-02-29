import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(2)
  comment: string;
}
