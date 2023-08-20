'use server';

import { SessionDataStorage } from '@/controller/session/server';
import { CustomerService } from '@/service/api';

export const login = async (name: string, password: string) => {
  const customerService = new CustomerService();

  const userAuthOptions = { username: name, password: password };
  const customer = await customerService.login(userAuthOptions);
  const sessionStorage = new SessionDataStorage();
  const session = sessionStorage.getData();
  session.customerId = customer.id;
  sessionStorage.save(session);
};
