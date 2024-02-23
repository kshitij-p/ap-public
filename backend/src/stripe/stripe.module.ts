import { DynamicModule, Module } from '@nestjs/common';
import { createStripeProviders } from './stripe.providers';
import { StripeModuleOptions, StripeModuleParams } from './stripe.types';

@Module({})
export class StripeModule {
  static register(
    params: StripeModuleParams,
    options: StripeModuleOptions,
  ): DynamicModule {
    const providers = createStripeProviders(params, options);

    return {
      module: StripeModule,
      providers,
      exports: providers,
      global: options.global,
    };
  }
}
