'use client';

import { FC, PropsWithChildren } from 'react';
import { CookiesProvider } from 'react-cookie';

const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};

export default SessionProvider;
