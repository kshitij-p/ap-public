import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { PrismaService } from './prisma/prisma.service';
import { PaymentService } from './payment/payment.service';
import { PaymentModule } from './payment/payment.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { PaymentProcessorModule } from './payment-processor/payment-processor.module';
import { WebhookService } from './webhook/webhook.service';
import { WebhookModule } from './webhook/webhook.module';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import configuration from './config/configuration';
import { CartController } from './cart/cart.controller';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
      ],
    }),

    StripeModule.register(
      {
        configEnvKey: 'STRIPE_API_KEY',
      },
      {
        stripeConfig: {
          apiVersion: '2023-10-16',
        },
        //Register as global for convenience
        global: true,
      },
    ),
    PaymentModule,
    ProductModule,
    PaymentProcessorModule,

    WebhookModule,

    CartModule,
  ],
  controllers: [AppController, ProductController, CartController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
    PrismaService,
    PaymentService,
    ProductService,
    WebhookService,
    CartService,
  ],
})
export class AppModule {}
