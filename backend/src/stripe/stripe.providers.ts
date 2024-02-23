import { Provider } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';
import { StripeModuleOptions, StripeModuleParams } from './stripe.types';

export const createStripeProviders = (
  params: StripeModuleParams,
  options: StripeModuleOptions,
): Provider[] => {
  return [
    {
      provide: StripeService,
      useFactory: (configService: ConfigService) => {
        let apiKey;
        if (typeof params === 'string') {
          apiKey = params;
        } else {
          apiKey =
            'key' in params
              ? params.key
              : configService.get(params.configEnvKey);
        }

        const client = new Stripe(apiKey, options.stripeConfig);

        return new StripeService(client);
      },
      inject: [ConfigService],
    },
  ];
};
