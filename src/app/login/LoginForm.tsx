'use client';

import style from '../registration/page.module.css';
import React, { useEffect } from 'react';
import { login } from './login-actions';
import { useSessionData } from '@/controller/session/client';
import { useState } from 'react';
import EmailLoginValid from './components/email/emailValidLogin';
import PasswordValidLogin from './components/password/passwordValidLogin';

export interface IFormDataLogin {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<IFormDataLogin>({
    email: '',
    password: '',
  });

  const [formValid, setFormValid] = useState(false);

  const [authError, setAuthError] = useState('');
  const errorStyle = {
    color: 'red',
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    const emailValid = emailRegex.test(formData.email);
    const passwordValid = passwordRegex.test(formData.password);
    setFormValid(emailValid && passwordValid);
  }, [formData]);

  async function handleSubmit(formData: FormData) {
    const formJson = Object.fromEntries(formData.entries());
    await login(formJson.name.toString(), formJson.pass.toString()).catch((err) =>
      setAuthError(`\u{26A0} There was an error during authorization. ${err.message} \u{26A0}`)
    );
  }

  const sessionData = useSessionData();

  return (
    <>
      {sessionData?.customerId ? (
        <p>
          <div>You have already logged in (customer ID {sessionData?.customerId})!</div>
        </p>
      ) : (
        <>
          <p style={errorStyle}>{authError}</p>
          <div className={style.container}>
            <form action={handleSubmit}>
              <div>
                <EmailLoginValid email={formData.email} setFormData={setFormData} />
              </div>
              <div className="relative">
                <PasswordValidLogin password={formData.password} setFormData={setFormData} />
              </div>
              <div className="flex">
                <span className={style.sentFormBtn} onClick={() => setFormData({ email: '', password: '' })}>
                  Reset form
                </span>
                <button className={style.sentFormBtn} type="submit" disabled={!formValid}>
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
