import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        status: createOrderDto.status,
        total: createOrderDto.total,
        addressId: createOrderDto.addressId,
        orderItems: {
          createMany: {
            data: createOrderDto.orderItems,
          },
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: true,
      },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        userId: updateOrderDto.userId,
        status: updateOrderDto.status,
        total: updateOrderDto.total,
        addressId: updateOrderDto.addressId,
      },
    });
  }

  remove(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
