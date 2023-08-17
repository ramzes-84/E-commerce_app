'use server';

import { apiRoot, turnOnPasswordMode } from '@/service/api/client';

export const login = async (name: string, password: string) => {
  const userAuthOptions = { username: name, password: password };
  turnOnPasswordMode(userAuthOptions);
};
