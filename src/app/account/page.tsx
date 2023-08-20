'use client';

import { CustomerInfo } from './CustomerInfo';
import { LogoutButton } from './LogoutButton';
import { getUserInfo } from './account-actions';
import { useState } from 'react';

export default function Page() {
  const [accountInfo, setAccountInfo] = useState(<p>Loading...</p>);

  getUserInfo().then((res) => setAccountInfo(<CustomerInfo customer={res} />));

  return (
    <>
      <h2 className="text-center uppercase mb-3">Account section</h2>
      {accountInfo}
      <LogoutButton />
    </>
  );
}
