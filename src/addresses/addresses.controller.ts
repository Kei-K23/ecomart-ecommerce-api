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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddressEntity } from './entities/address.entity';

@Controller('api/addresses')
@ApiTags('api/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @ApiCreatedResponse({ type: AddressEntity })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  @ApiOkResponse({ type: AddressEntity, isArray: true })
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id/:userId')
  @ApiOkResponse({ type: AddressEntity })
  async findOne(@Param('id') id: string, @Param('userId') userId?: string) {
    const address = await this.addressesService.findOne(id, userId);
    if (!address) throw new NotFoundException(`Address ${id} not found`);
    return address;
  }

  @Patch(':id')
  @ApiOkResponse({ type: AddressEntity })
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const exAddress = await this.findOne(id);
    if (exAddress) return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AddressEntity })
  async remove(@Param('id') id: string) {
    const exAddress = await this.findOne(id);
    if (exAddress) return this.addressesService.remove(id);
  }
}
