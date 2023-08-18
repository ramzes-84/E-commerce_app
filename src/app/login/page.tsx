'use client';

import React from 'react';
import { login } from './login-actions';
import style from '../registration/page.module.css';
import { useState } from 'react';
import EmailLoginValid from './components/email/emailValidLogin';
import PasswordValidLogin from './components/password/passwordValidLogin';

export interface IFormDataLigin {
  email: string;
  password: string;
}

export function LoginForm() {
  const [formData, setFormData] = useState<IFormDataLigin>({
    email: '',
    password: '',
  });

  async function handleSubmit(e: { preventDefault: () => void; target: any }) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    await login(formJson.name as string, formJson.pass as string);
  }

  return (
    <>
      <div className={style.container}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <EmailLoginValid email={formData.email} setFormData={setFormData} />
          </div>
          <div className="relative">
            <PasswordValidLogin password={formData.password} setFormData={setFormData} />
          </div>
          {/* <label htmlFor="name">
          E-mail:
          <input type="email" id="name" name="name" required={true} autoComplete="username" />
        </label>
        <label htmlFor="pass">
          Password:
          <input type="password" id="pass" name="pass" required={true} autoComplete="current-password" />
        </label> */}
          <div className="flex">
            <button className={style.sentFormBtn} type="reset">
              Reset form
            </button>
            <button className={style.sentFormBtn} type="submit">
              Submit form
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="text-center uppercase mb-3">Hello, User!</h1>
      <LoginForm />
    </>
  );
}
