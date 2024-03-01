import { Test, TestingModule } from '@nestjs/testing';
import { StripeWebhookController } from './stripe-webhook.controller';
import { StripeWebhookService } from './stripe-webhook.service';

describe('StripeWebhookController', () => {
  let controller: StripeWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeWebhookController],
      providers: [StripeWebhookService],
    }).compile();

    controller = module.get<StripeWebhookController>(StripeWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
