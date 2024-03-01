import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class StripeWebhookService {
  async handleWebhookEvent(event: any, res: Response) {
    try {
      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log(event.data.object);
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
