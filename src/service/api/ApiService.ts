import { createApiRoot } from '@/service/api/client';

export abstract class ApiService {
  constructor(protected apiRoot = createApiRoot()) {}
}
