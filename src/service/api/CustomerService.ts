import createApiRoot from '@/service/api/client/createApiRoot';
import { ApiService } from '@/service/api/ApiService';
import { SessionDataStorage } from '@/controller/session/server';

export type UserCredentials = { username: string; password: string };

interface CustomerDraft {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses: IAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses?: number[];
  billingAddresses?: number[];
}

export interface IMyCustomer {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  version: number;
  addresses: IAddress[];
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
}

export interface IAddress {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
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

  public async register(
    formData: { [key: string]: string },
    formShippingAddress: IAddress,
    formBillingAddress: IAddress
  ) {
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
    return result.body;
  }

  public isLogged() {
    const { customerId } = new SessionDataStorage().getData();
    return !!customerId;
  }

  public async updateFieldName(customer: IMyCustomer, fieldName: string, value?: string) {
    if (customer.version) {
      const actionArr = {
        action: `set${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`,
        [fieldName]: value,
      };
      await this.apiRoot
        .me()
        .post({
          body: {
            version: customer.version,
            actions: [actionArr],
          },
        })
        .execute();
    }
  }
}
