'use client';

import React, { useState } from 'react';
import { login } from './login-actions';
import { useSessionData } from '@/controller/session/client';

export function LoginForm() {
  async function handleSubmit(formData: FormData) {
    const formJson = Object.fromEntries(formData.entries());
    await login(formJson.name.toString(), formJson.pass.toString()).catch((err) =>
      setAuthError(`\u{26A0} There was an error during authorization. ${err.message} \u{26A0}`)
    );
  }

  const sessionData = useSessionData();
  const [authError, setAuthError] = useState('');
  const errorStyle = {
    color: 'red',
  };

  return (
    <>
      {sessionData?.customerId ? (
        <p>
          <div>You have already logged in (customer ID {sessionData?.customerId})!</div>
        </p>
      ) : (
        <>
          <p style={errorStyle}>{authError}</p>
          <form action={handleSubmit}>
            <label htmlFor="name">
              E-mail:
              <input type="email" id="name" name="name" required={true} autoComplete="username" />
            </label>
            <hr />
            <label htmlFor="pass">
              Password:
              <input type="password" id="pass" name="pass" required={true} autoComplete="current-password" />
            </label>
            <hr />
            <button type="submit">Submit form</button>
          </form>
        </>
      )}
    </>
  );
}
