'use server';

import { createApiRoot } from '@/service/api/client';

export const logout = async () => {};

type UserCredentials = { username: string; password: string };
export const getUserInfo = async (credentials: UserCredentials) => {
  return await createApiRoot(credentials).me().get().execute();
};
