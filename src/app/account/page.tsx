'use client';

import { useEffect, useState } from 'react';
import { CustomerInfo } from './CustomerInfo';
import { LogoutButton } from './LogoutButton';
import { getUserInfo, userIsLogged } from './account-actions';
import { IMyCustomer } from '@/service/api/CustomerService';

export default function Page() {
  const [customer, setCustomer] = useState<IMyCustomer>();
  const isLogged = userIsLogged();

  useEffect(() => {
    async function getDataCustomer() {
      const result = await getUserInfo();
      setCustomer(result);
    }
    getDataCustomer();
  }, [customer]);

  return (
    <>
      <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Your Account</h2>
      {isLogged && customer && <CustomerInfo customer={customer} />}
      {isLogged && <LogoutButton />}
    </>
  );
}
