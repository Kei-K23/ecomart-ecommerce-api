import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddressEntity } from './entities/address.entity';

@Controller('addresses')
@ApiTags('addresses')
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
  findOne(@Param('id') id: string, @Param('userId') userId: string) {
    return this.addressesService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AddressEntity })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: AddressEntity })
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
