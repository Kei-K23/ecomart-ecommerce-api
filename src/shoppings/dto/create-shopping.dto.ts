import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateShoppingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  shoppingCartItems: [{ productId: string }];
}
