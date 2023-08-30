'use server';

import CustomerService, {
  ChangeAddresAction,
  IMyAddress,
  IMyCustomer,
  UpdateAction,
} from '@/service/api/CustomerService';

export const getUserInfo = async () => {
  const customerService = new CustomerService();
  const customer = await customerService.getCurrentCustomer();
  const myCustomer: IMyCustomer = {
    email: customer.email,
    password: customer.password,
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: customer.dateOfBirth,
    version: customer.version,
    addresses: customer.addresses.map((address: any) => ({
      id: address.id,
      key: address.key,
      streetName: address.streetName,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    })),
    shippingAddressIds: customer.shippingAddressIds,
    billingAddressIds: customer.billingAddressIds,
  };
  return myCustomer;
};

export const logout = () => {
  const customerService = new CustomerService();
  customerService.logout();
};

export const userIsLogged = () => {
  const customerServices = new CustomerService();
  return customerServices.isLogged();
};

export const updateUserField = async (
  customer: IMyCustomer,
  fieldName: string,
  action: UpdateAction,
  value?: string
) => {
  const customerService = new CustomerService();
  if (fieldName) await customerService.updateFieldName(customer, fieldName, action, value);
};

export const updateAddressField = async (customer: IMyCustomer, action: ChangeAddresAction, address: IMyAddress) => {
  const customerService = new CustomerService();
  await customerService.changeAddAddress(customer, action, address);
};
