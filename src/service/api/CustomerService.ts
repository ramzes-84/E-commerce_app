import createApiRoot from '@/service/api/client/createApiRoot';
import { ApiService } from '@/service/api/ApiService';
import { IFormData } from '@/app/registration/page';

export type UserCredentials = { username: string; password: string };

interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: {
    streetName?: string;
    city?: string;
    postalCode?: string;
    country: string;
  }[];
}

export default class CustomerService extends ApiService {
  public async login(credentials: UserCredentials) {
    this.apiRoot = createApiRoot(credentials);
    return this.getCurrentCustomer();
  }

  public async getCurrentCustomer() {
    const result = await this.apiRoot.me().get().execute();
    return result.body;
  }

  public async register(formData: IFormData) {
    this.apiRoot = createApiRoot();
    return this.getRegisterUser(formData);
  }

  public async getRegisterUser(formData: IFormData) {
    const customerDraft: CustomerDraft = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      addresses: [
        {
          streetName: formData.streetName,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      ],
    };
    const result = await this.apiRoot.me().signup().post({ body: customerDraft }).execute();
    return result.body;
  }
}
