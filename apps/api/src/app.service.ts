import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'hapzoo-api',
    };
  }

  getInfo() {
    return {
      name: 'HAPZOO API',
      version: '0.1.0',
      description: 'Ensemble Playground for Music Communities',
      endpoints: {
        health: '/api/health',
        docs: '/api/docs (coming soon)',
      },
    };
  }
}
