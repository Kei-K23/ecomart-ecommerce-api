import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private paymentsService: PaymentsService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const checkoutData = createOrderDto.orderItems.map((orderItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: orderItem.productId,
        },
        unit_amount: orderItem.price,
      },
      quantity: orderItem.quantity,
    }));

    const session = await this.paymentsService.createCheckout(checkoutData);
    console.log(session.url);
    console.log(session);

    return await this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        total: createOrderDto.total,
        checkoutSessionId: session.id,
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
