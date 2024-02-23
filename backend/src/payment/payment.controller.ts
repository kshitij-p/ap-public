import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentBodyDto } from './payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/list')
  async listPayments() {
    return { payments: await this.paymentService.listPayments() };
  }

  @Post('/create')
  async createPayment(@Body() body: CreatePaymentBodyDto) {
    const payment = await this.paymentService.createPayment(body);

    return {
      payment,
    };
  }

  @Patch('/:id/expire')
  async expirePayment(@Param('id') id: string) {
    const payment = await this.paymentService.expirePaymentById(id);

    return {
      payment,
      message: 'Payment expiration request sent.',
    };
  }
}
