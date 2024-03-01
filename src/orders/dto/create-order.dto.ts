import { ApiProperty } from '@nestjs/swagger';
import { OrderItem, OrderType } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  status?: OrderType | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  total: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  addressId: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  orderItems: OrderItem[];
}
