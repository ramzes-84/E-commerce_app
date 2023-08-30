'use server';

import { CustomerService } from '@/service/api';
import { SessionDataStorage } from '@/controller/session/server';
import { IAddress, UserCredentials } from '@/service/api/CustomerService';

export const register = async (
  formData: { [key: string]: string },
  formShippingAddress: IAddress,
  formBillingAddress: IAddress
) => {
  const customerService = new CustomerService();
  await customerService.register(formData, formShippingAddress, formBillingAddress);
};

export const autoLogin = async (email: string, password: string) => {
  const credentials: UserCredentials = {
    username: email,
    password: password,
  };
  const customerService = new CustomerService();
  const customer = await customerService.login(credentials);
  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.customerId = customer.id;
  sessionStorage.save(session);
};
