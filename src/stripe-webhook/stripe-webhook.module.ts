import { Module } from '@nestjs/common';
import { StripeWebhookService } from './stripe-webhook.service';
import { StripeWebhookController } from './stripe-webhook.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StripeWebhookController],
  providers: [StripeWebhookService],
  imports: [PrismaModule],
})
export class StripeWebhookModule {}
