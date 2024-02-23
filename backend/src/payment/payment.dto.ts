import { PaymentProvider } from '@prisma/client';

export class CreatePaymentBodyDto {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  successUrl: string;
  provider: PaymentProvider;
}

export class ExpirePaymentDto {
  id: string;
  providerId: string;
  provider: PaymentProvider;
}
