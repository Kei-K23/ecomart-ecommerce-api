import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderDetailsEntity, OrderEntity } from './entities/order.entity';

@Controller('api/orders')
@ApiTags('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderDetailsEntity })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderDetailsEntity })
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  @Patch(':id')
  @ApiOkResponse({ type: OrderEntity })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const exOrder = await this.findOne(id);
    if (exOrder) return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OrderEntity })
  async remove(@Param('id') id: string) {
    const exOrder = await this.findOne(id);
    if (exOrder) return this.ordersService.remove(id);
  }
}
