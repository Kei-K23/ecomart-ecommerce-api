import { Body, Controller, Post, Res } from '@nestjs/common';
import { StripeWebhookService } from './stripe-webhook.service';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('stripe-webhook')
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
          const paymentIntent = event.data.object;

          console.log(paymentIntent);
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
