import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderItem, OrderType } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  addressId: string;

  @ApiProperty()
  status: OrderType;

  @ApiProperty()
  checkoutSessionId: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class OrderItemEntity implements OrderItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class OrderDetailsEntity extends OrderEntity {
  @ApiProperty({ isArray: true, type: [OrderItemEntity] })
  orderItems: OrderItemEntity[];
}
