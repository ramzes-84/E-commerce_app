'use client';

import React, { useEffect } from 'react';
import { login } from './login-actions';
import { useSessionData } from '@/controller/session/client';
import style from '../registration/page.module.css';
import { useState } from 'react';
import EmailLoginValid from './components/email/emailValidLogin';
import PasswordValidLogin from './components/password/passwordValidLogin';

export interface IFormDataLogin {
  email: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<IFormDataLogin>({
    email: '',
    password: '',
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    const emailValid = emailRegex.test(formData.email);
    const passwordValid = passwordRegex.test(formData.password);
    setFormValid(emailValid && passwordValid);
  }, [formData]);

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
            <button className={style.sentFormBtn} type="submit" disabled={!formValid}>
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
