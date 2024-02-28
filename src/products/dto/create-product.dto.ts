import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ required: true })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  stock: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  image?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  categoryId: string;
}
