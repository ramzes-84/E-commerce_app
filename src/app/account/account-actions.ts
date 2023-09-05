'use server';

import CustomerService, {
  ChangeAction,
  ChangeAddresAction,
  ChangeEmail,
  IMyAddress,
  IMyCustomer,
  UpdateAction,
} from '@/service/api/CustomerService';
import { Customer } from '@commercetools/platform-sdk';

export const returnCustomerData = (newCustomer: Customer | undefined) => {
  if (newCustomer) {
    const myCustomer: IMyCustomer = {
      email: newCustomer.email,
      password: newCustomer.password,
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      dateOfBirth: newCustomer.dateOfBirth,
      version: newCustomer.version,
      addresses: newCustomer.addresses.map((address: any) => ({
        id: address.id,
        key: address.key,
        streetName: address.streetName,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      })),
      shippingAddressIds: newCustomer.shippingAddressIds,
      billingAddressIds: newCustomer.billingAddressIds,
    };
    return myCustomer;
  }
};

export const getUserInfo = async () => {
  const customerService = new CustomerService();
  const customer = await customerService.getCurrentCustomer();
  const result = returnCustomerData(customer);
  return result;
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
  const newCustomer = await customerService.updateFieldName(customer, fieldName, action, value);
  const result = returnCustomerData(newCustomer);
  return result;
};

export const updateAddressField = async (customer: IMyCustomer, action: ChangeAddresAction, address: IMyAddress) => {
  const customerService = new CustomerService();
  const newCustomer = await customerService.changeAddAddress(customer, action, address);
  const result = returnCustomerData(newCustomer);
  return result;
};

export const updateEmail = async (customer: IMyCustomer, actionType: ChangeEmail, value: string) => {
  const customerService = new CustomerService();
  const newCustomer = await customerService.changeEmail(customer, actionType, value);
  const result = returnCustomerData(newCustomer);
  return result;
};

export const updatePassword = async (customer: IMyCustomer, newPassword: string, currentPassword: string) => {
  const customerService = new CustomerService();
  const newCustomer = await customerService.changePassword(customer, newPassword, currentPassword);
  const result = returnCustomerData(newCustomer);
  return result;
};

export const removeSetAddress = async (customer: IMyCustomer, action: ChangeAction, address: IMyAddress) => {
  const customerService = new CustomerService();
  const newCustomer = await customerService.deleteSetAddress(customer, action, address);
  const result = returnCustomerData(newCustomer);
  return result;
};
