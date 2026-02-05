import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'ensemble-api',
    };
  }

  getInfo() {
    return {
      name: 'Ensemble API',
      version: '0.1.0',
      description: '음악 동호인을 위한 워크스페이스 기반 SaaS API',
      endpoints: {
        health: '/api/health',
        docs: '/api/docs (coming soon)',
      },
    };
  }
}
