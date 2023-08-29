'use server';

import CustomerService, { IMyCustomer } from '@/service/api/CustomerService';

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

export const changeFieldName = async (customer: IMyCustomer, fieldName: string, value?: string) => {
  const customerService = new CustomerService();
  if (fieldName) await customerService.updateFieldName(customer, fieldName, value);
};
