import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'Welcome to Transformers API, please refer to localhost:3000/api to view documentation.';
  }
}
