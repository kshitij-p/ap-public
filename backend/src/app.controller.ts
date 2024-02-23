import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentService } from './payment/payment.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get('/')
  getStatus() {
    return this.appService.getStatus();
  }
}
