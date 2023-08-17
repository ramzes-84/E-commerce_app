'use client';

import React from 'react';
import { login } from './login-actions';

function LoginForm() {
  async function handleSubmit(e: { preventDefault: () => void; target: any }) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    await login(formJson.name as string, formJson.pass as string);
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">
          E-mail:
          <input type="email" id="name" name="name" required={true} autoComplete="username"/>
        </label>
        <hr />
        <label htmlFor="pass">
          Password:
          <input type="password" id="pass" name="pass" required={true} autoComplete="current-password"/>
        </label>
        <hr />
        <button type="reset">Reset form</button>
        <button type="submit">Submit form</button>
      </form>
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
