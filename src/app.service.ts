import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      project: 'fordem-api',
      version: '1.0.0',
      members: ['Julien DA CORTE']
    }
  }
}
