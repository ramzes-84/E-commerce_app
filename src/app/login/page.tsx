'use client';

import React from 'react';
import { login } from './login-actions';
import { useSessionData } from '@/controller/session/client';
import style from '../registration/page.module.css';
import { useState } from 'react';
import EmailLoginValid from './components/email/emailValidLogin';
import PasswordValidLogin from './components/password/passwordValidLogin';

export interface IFormDataLigin {
  email: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<IFormDataLigin>({
    email: '',
    password: '',
  });

  async function handleSubmit(formData: FormData) {
    const formJson = Object.fromEntries(formData.entries());
    await login(formJson.name as string, formJson.pass as string);
  }

  const sessionData = useSessionData();

  return (
    <>
    <div className={style.container}>
      <form action={handleSubmit}>
        <div>
          <EmailLoginValid email={formData.email} setFormData={setFormData} />
        </div>
        <div className="relative">
          <PasswordValidLogin password={formData.password} setFormData={setFormData} />
        </div>
        <div className="flex">
          <button className={style.sentFormBtn} type="reset">
            Reset form
          </button>
          <button className={style.sentFormBtn} type="submit">
            Submit form
          </button>
        </div>
      </form>
      {sessionData?.customerId ? (
        <p>
          <div>Customer Id:</div>
          <div>{sessionData?.customerId}</div>
        </p>
      ) : null}
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
