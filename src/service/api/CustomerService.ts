import { createApiRoot } from '@/service/api/client';
import { ApiService } from '@/service/api/ApiService';

type UserCredentials = { username: string; password: string };

export default class CustomerService extends ApiService {
  public async login(credentials: UserCredentials) {
    this.apiRoot = createApiRoot(credentials);
    return this.getCurrentCustomer();
  }

  public async getCurrentCustomer() {
    const result = await this.apiRoot.me().get().execute();
    return result.body;
  }
}
