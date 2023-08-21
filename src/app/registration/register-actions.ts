'use server';

import { CustomerService } from '@/service/api';
import { IFormData } from './page';
import { SessionDataStorage } from '@/controller/session/server';
import { UserCredentials } from '@/service/api/CustomerService';

export const register = async (formData: IFormData) => {
  const customerService = new CustomerService();
  await customerService.register(formData);
};

export const autoLogin = async (formData: IFormData) => {
  const credentials: UserCredentials = {
    username: formData.email,
    password: formData.password,
  };
  const customerService = new CustomerService();
  const customer = await customerService.login(credentials);
  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.customerId = customer.id;
  sessionStorage.save(session);
};
