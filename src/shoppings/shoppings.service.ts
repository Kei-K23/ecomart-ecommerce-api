import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingDto } from './dto/create-shopping.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingsService {
  constructor(private prisma: PrismaService) {}
  async create(createShoppingDto: CreateShoppingDto) {
    const shoppingCart = await this.prisma.shoppingCart.upsert({
      where: {
        userId: createShoppingDto.userId,
      },
      update: {},
      create: {
        userId: createShoppingDto.userId,
      },
      include: {
        shoppingCartItems: true,
      },
    });

    const existingProductIds = new Set(
      shoppingCart.shoppingCartItems.map((item) => item.productId),
    );

    const newShoppingCartItemsData = createShoppingDto.shoppingCartItems
      .filter((item) => !existingProductIds.has(item.productId))
      .map((item) => ({
        productId: item.productId,
        shoppingCartId: shoppingCart.id,
      }));

    if (newShoppingCartItemsData.length > 0) {
      await this.prisma.shoppingCartItem.createMany({
        data: newShoppingCartItemsData,
      });
    }

    return shoppingCart;
  }

  findAll() {
    return this.prisma.shoppingCart.findMany();
  }

  async findOne(id: string) {
    const sc = await this.prisma.shoppingCart.findUnique({
      where: {
        id,
      },
      include: {
        shoppingCartItems: true,
      },
    });

    if (!sc) {
      throw new NotFoundException('Shopping Cart not found');
    }

    return sc;
  }

  async increment(id: string) {
    const sci = await this.prisma.shoppingCartItem.findUnique({
      where: { id },
    });

    if (!sci) {
      throw new NotFoundException('Shopping Cart item not found');
    }

    const existingQuantity = sci.quantity;

    return await this.prisma.shoppingCartItem.update({
      where: { id },
      data: { quantity: existingQuantity + 1 },
    });
  }

  async decrement(id: string) {
    const sci = await this.prisma.shoppingCartItem.findUnique({
      where: { id },
    });
    if (!sci) {
      throw new NotFoundException('Shopping Cart item not found');
    }
    const existingQuantity = sci.quantity;

    if (existingQuantity <= 1) {
      return await this.prisma.shoppingCartItem.delete({
        where: { id },
      });
    }
    return await this.prisma.shoppingCartItem.update({
      where: { id },
      data: { quantity: existingQuantity - 1 },
    });
  }

  remove(id: string) {
    return this.prisma.shoppingCart.delete({
      where: {
        id,
      },
    });
  }

  // SCI = shoppingCart item
  removeSCI(id: string) {
    return this.prisma.shoppingCartItem.delete({
      where: {
        id,
      },
    });
  }
}
