import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  fullAddress: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  zip: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
