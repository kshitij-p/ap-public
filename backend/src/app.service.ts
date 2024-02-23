import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV_CONST } from './config/config.constants';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getStatus() {
    return {
      status: 'available',
      env: this.configService.get(NODE_ENV_CONST),
    };
  }
}
