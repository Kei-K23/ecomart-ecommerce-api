import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [ProductsModule, PrismaModule, CategoriesModule, UsersModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
