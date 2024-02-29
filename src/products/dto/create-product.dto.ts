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
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stock: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;
}
