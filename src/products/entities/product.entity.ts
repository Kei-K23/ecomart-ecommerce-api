import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty({ required: false, nullable: true })
  image: string | null;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
