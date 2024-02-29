import { ApiProperty } from '@nestjs/swagger';
import { ShoppingCart, ShoppingCartItem } from '@prisma/client';

export class ShoppingEntity implements ShoppingCart {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ShoppingItemEntity implements ShoppingCartItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  shoppingCartId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ShoppingDetailEntity extends ShoppingEntity {
  shoppingCartItems: ShoppingCartItem[];
}
