'use client';

import React from 'react';
import { login } from './login-actions';
import { useSessionData } from '@/controller/session/client';

function LoginForm() {
  async function handleSubmit(formData: FormData) {
    const formJson = Object.fromEntries(formData.entries());
    await login(formJson.name as string, formJson.pass as string);
  }

  const sessionData = useSessionData();

  return (
    <>
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
        <button type="reset">Reset form</button>
        <button type="submit">Submit form</button>
      </form>
      {sessionData?.customerId ? (
        <p>
          <div>Customer Id:</div>
          <div>{sessionData?.customerId}</div>
        </p>
      ) : null}
    </>
  );
}

export default function Page() {
  return (
    <>
      <h1>Hello, User!</h1>
      <LoginForm />
    </>
  );
}
