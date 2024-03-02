import { Body, Controller, Post, Res } from '@nestjs/common';
import { StripeWebhookService } from './stripe-webhook.service';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderType } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/stripe-webhook')
@ApiTags('api/stripe-webhook')
export class StripeWebhookController {
  constructor(
    private readonly stripeWebhookService: StripeWebhookService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async handleWebhookEvent(@Body() event: any, @Res() res: Response) {
    try {
      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log(event.data.object);
          break;
        case 'payment_intent.canceled':
          break;
        case 'checkout.session.expired':
          await this.prisma.order.update({
            where: {
              checkoutSessionId: event.data.object,
            },
            data: {
              status: OrderType.FAILED,
            },
          });
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object;

          await this.prisma.payment.create({
            data: {
              checkoutSessionId: checkoutSession.id,
              amount: checkoutSession.amount_total,
              payment: checkoutSession.payment_method_types[0],
              paymentStatus: checkoutSession.payment_status,
            },
          });

          await this.prisma.order.update({
            where: {
              checkoutSessionId: checkoutSession.id,
            },
            data: {
              status: OrderType.PROCESSING,
            },
          });

          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a response to acknowledge receipt of the event
      res.json({ received: true });
    } catch (error) {
      console.error('Error handling webhook event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
