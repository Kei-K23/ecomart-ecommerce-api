import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createCheckout(
    checkoutData: Array<{
      price_data: {
        currency: string;
        product_data: {
          name: string;
        };
        unit_amount: number;
      };
      quantity: number;
    }>,
  ) {
    return await this.stripe.checkout.sessions.create({
      line_items: checkoutData,
      mode: 'payment',
      success_url: `http://localhost:3000/api-doc`,
      cancel_url: `http://localhost:3000/api-doc`,
    });
  }
}
