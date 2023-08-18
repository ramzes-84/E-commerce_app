'use server';

import { turnOnPasswordMode } from '../../service/api/client';
import { getUserInfo } from '../account/account-actions';

export const login = async (name: string, password: string) => {
  const userAuthOptions = { username: name, password: password };
  turnOnPasswordMode(userAuthOptions);
  const authResponse = await getUserInfo();
  return authResponse;
};
