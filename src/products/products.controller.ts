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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return product;
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductEntity })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const exAddress = await this.findOne(id);
    if (exAddress) return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  async remove(@Param('id') id: string) {
    const exAddress = await this.findOne(id);
    if (exAddress) return this.productsService.remove(id);
  }
}
