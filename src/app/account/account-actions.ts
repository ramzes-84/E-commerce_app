'use server';

import { apiRoot, turnOffPasswordMode } from '@/service/api/client';

export const logout = async () => {
  turnOffPasswordMode();
};

export const getUserInfo = async () => {
  const response = await apiRoot.me().get().execute();
  return response;
};
