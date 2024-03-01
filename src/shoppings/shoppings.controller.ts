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
import { ShoppingsService } from './shoppings.service';
import { CreateShoppingDto } from './dto/create-shopping.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ShoppingDetailEntity,
  ShoppingEntity,
  ShoppingItemEntity,
} from './entities/shopping.entity';

@Controller('shoppings')
@ApiTags('shoppings')
export class ShoppingsController {
  constructor(private readonly shoppingsService: ShoppingsService) {}

  @Post()
  @ApiCreatedResponse({ type: ShoppingEntity })
  create(@Body() createShoppingDto: CreateShoppingDto) {
    return this.shoppingsService.create(createShoppingDto);
  }

  @Get()
  @ApiOkResponse({ type: ShoppingEntity, isArray: true })
  findAll() {
    return this.shoppingsService.findAll();
  }

  //TODO: Correct the type for shopping cart details
  @Get(':id')
  @ApiOkResponse({ type: ShoppingDetailEntity })
  async findOne(@Param('id') id: string) {
    const shopping = await this.shoppingsService.findOne(id);
    if (!shopping) throw new NotFoundException(`Shopping ${id} not found`);
  }

  @Patch(':id/increment')
  @ApiOkResponse({ type: ShoppingItemEntity })
  increment(@Param('id') id: string) {
    return this.shoppingsService.increment(id);
  }

  @Patch(':id/decrement')
  @ApiOkResponse({ type: ShoppingItemEntity })
  decrement(@Param('id') id: string) {
    return this.shoppingsService.decrement(id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ShoppingEntity })
  remove(@Param('id') id: string) {
    return this.shoppingsService.decrement(id);
  }

  @Delete(':id/sci')
  @ApiOkResponse({ type: ShoppingItemEntity })
  removeSCI(@Param('id') id: string) {
    return this.shoppingsService.removeSCI(id);
  }
}
