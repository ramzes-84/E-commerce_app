'use client';

import React, { useState } from 'react';
import { getUserInfo, logout } from './account-actions';
import { apiRoot } from '@/service/api/client';

function AccountInfo() {
  const [firstName, setFirstName] = useState('Unknown user');
  const [lastName, setLastName] = useState('Unknown user');

  async function handleLogout(e: { preventDefault: () => void }) {
    e.preventDefault();
    await logout();
  }

  getUserInfo()
    .then((res) => res.body)
    .then((customer) => {
      if (customer.firstName && customer.lastName) {
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
      }
    });

  return (
    <div>
      <p>Hello, {firstName}</p>
      <p>Your name is {firstName}</p>
      <p>Your lastname is {lastName}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default function Page() {
  return <AccountInfo />;
}
