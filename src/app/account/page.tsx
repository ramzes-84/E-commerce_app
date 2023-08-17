'use client';

import React, { useState } from 'react';
import { getUserInfo, logout } from './account-actions';
import Link from 'next/link';

function AccountInfo() {
  const [userInfo, setUserInfo] = useState(<>Loading data, please wait...</>);

  async function handleLogout(e: { preventDefault: () => void }) {
    e.preventDefault();
    await logout();
  }

  getUserInfo()
    .then((res) => {
      if(res.statusCode?.toString().startsWith('20')) {
        setUserInfo(
          <>
            <p>Your name is {res.body.firstName}</p>
            <p>Your lastname is {res.body.firstName}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        )
      }
    })
    .catch(err => setUserInfo(
    <>
      <p>You are not logged in.</p>
      <p>Please, sign in
        <Link href="/login">
          here 
        </Link>
          first.
      </p>
    </>));

  return (
    <div>{userInfo}</div>
  );
}

export default function Page() {
  return <AccountInfo />;
}
