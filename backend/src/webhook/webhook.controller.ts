import {
  Controller,
  Post,
  Headers,
  BadRequestException,
  Req,
  RawBodyRequest,
  InternalServerErrorException,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ConfigService } from '@nestjs/config';
import { STRIPE_WEBHOOK_SECRET_CONST } from 'src/config/config.constants';

@Controller('webhooks')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/stripe')
  async handleStripeWebhook(
    @Headers() headers: Record<string, string>,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!req.rawBody)
      throw new InternalServerErrorException({
        message:
          "Failed to get request's raw body. Please ensure the rawBody option is enabled",
      });

    const signature = headers['stripe-signature'];

    if (!signature)
      throw new BadRequestException("No 'stripe-signature' provided");

    if (!req.rawBody) throw new BadRequestException('No request body found');

    try {
      await this.webhookService.processStripeWebhook(
        signature,
        req.rawBody,
        this.configService.get(STRIPE_WEBHOOK_SECRET_CONST) as string,
      );
    } catch (e) {
      console.error('Failed to process stripe webhook', e);
      throw e;
    }

    return {
      message: 'Successfully processed webhook',
    };
  }
}
