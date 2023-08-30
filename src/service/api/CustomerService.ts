import createApiRoot from '@/service/api/client/createApiRoot';
import { ApiService } from '@/service/api/ApiService';
import { SessionDataStorage } from '@/controller/session/server';

export type UserCredentials = { username: string; password: string };

export type UpdateAction = 'setCompanyName' | 'setDateOfBirth' | 'setFirstName' | 'setLastName' | 'setLocale' | 'setMiddleName' | 'setSalutation' | 'setTitle' | 'setVatId';

export type ChangeAction = 'removeAddress' | 'setDefaultShippingAddress' | 'addBillingAddressId' | 'addShippingAddressId' | 'removeBillingAddressId' | 'removeShippingAddressId' | 'setDefaultBillingAddress'

export type ChangeAddresAction = 'changeAddress' | 'addAddress'

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
  addresses: IMyAddress[];
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
}

export interface IAddress {
  streetName?: string;
  city?: string;
  postalCode?: string;
  country: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}

export interface IMyAddress {
  id: string;
  key: string;
  streetName?: string;
  city?: string;
  postalCode?: string;
  country: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}

interface UpdateCustomer {
  action: UpdateAction;
  [x: string]: string;
}

interface ChangeAddressCustomer {
  action: ChangeAddresAction;
  address: IAddress;
  addressId?: string;
  addressKey?: string;
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

  public async updateFieldName(customer: IMyCustomer, fieldName: string, actionType: UpdateAction, value?: string) {
    if (customer.version && value) {
        const actionArr: UpdateCustomer = {
          action: actionType,
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

  public async changeAddAddress(customer: IMyCustomer, actionType: ChangeAddresAction, address: IMyAddress) {
    if (customer.version) {
      const myAddress: IMyAddress = {
        id: address.id,
        key: address.key,
        country: address.country,
        city: address.city,
        streetName: address.streetName,
        postalCode: address.postalCode,
      }
      const actionArr: ChangeAddressCustomer = {
        action: actionType,
        address: myAddress,
        addressId: myAddress.id,
        addressKey: myAddress.key,
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
