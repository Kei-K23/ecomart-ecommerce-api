import { Module } from '@nestjs/common';
import { ShoppingsService } from './shoppings.service';
import { ShoppingsController } from './shoppings.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ShoppingsController],
  providers: [ShoppingsService],
  imports: [PrismaModule],
})
export class ShoppingsModule {}
