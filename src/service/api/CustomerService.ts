import createApiRoot from '@/service/api/client/createApiRoot';
import { ApiService } from '@/service/api/ApiService';
import { IAddress, IFormData } from '@/app/registration/page';
import { SessionDataStorage } from '@/controller/session/server';

export type UserCredentials = { username: string; password: string };

interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: IAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses?: number[];
  billingAddresses?: number[];
}

export default class CustomerService extends ApiService {
  public async login(credentials: UserCredentials) {
    this.apiRoot = createApiRoot(credentials);
    return this.getCurrentCustomer();
  }

  public logout() {
    new SessionDataStorage().save({});
  }

  public async getCurrentCustomer() {
    const result = await this.apiRoot.me().get().execute();
    return result.body;
  }

  public async register(formData: IFormData, formShippingAddress: IAddress, formBillingAddress: IAddress) {
    const customerDraft: CustomerDraft = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      addresses: [
        {
          streetName: formShippingAddress.streetName,
          city: formShippingAddress.city,
          postalCode: formShippingAddress.postalCode,
          country: formShippingAddress.country,
        },
        {
          streetName: formBillingAddress.streetName,
          city: formBillingAddress.city,
          postalCode: formBillingAddress.postalCode,
          country: formBillingAddress.country,
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [1],
    };

    if (formShippingAddress.defaultShippingAddress) {
      customerDraft.defaultShippingAddress = 0;
    }
    if (formBillingAddress.defaultBillingAddress) {
      customerDraft.defaultBillingAddress = 1;
    }

    const result = await this.apiRoot.me().signup().post({ body: customerDraft }).execute();
    console.log(result.body.customer.addresses[0]);
    console.log(result.body.customer.addresses[1]);

    return result.body;
  }

  public isLogged() {
    const { customerId } = new SessionDataStorage().getData();
    return !!customerId;
  }
}
