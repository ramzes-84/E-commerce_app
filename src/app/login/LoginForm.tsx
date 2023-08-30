'use client';

import style from '../registration/page.module.css';
import React, { useEffect } from 'react';
import { login } from './login-actions';
import { useState } from 'react';
import EmailValid from '../registration/components/email/emailValid';
import PasswordValid from '../registration/components/password/passwordValid';

export interface IFormDataLogin {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formValid, setFormValid] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loginSuccess, setLogingSuccess] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);

  const styled = loginSuccess ? ' bg-[#c0e7b9] ' : ' bg-red-200';
  const msg = authError ? authError : 'Log in successful!';

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    const emailValid = emailRegex.test(email);
    const passwordValid = passwordRegex.test(password);
    setFormValid(emailValid && passwordValid);
  }, [email, password]);

  async function handleSubmit(formData: FormData) {
    const formJson = Object.fromEntries(formData.entries());
    await login(formJson.email.toString(), formJson.password.toString())
      .then(() => {
        setLogingSuccess(true);
        setMsgVisible(true);
      })
      .catch((err) => {
        setAuthError(`\u{26A0} There was an error during authorization. ${err.message} \u{26A0}`);
        setMsgVisible(true);
      });
  }
  return (
    <>
      <p className={msgVisible ? `${styled}` : 'hidden'}>{msg}</p>
      <h1 className="text-center uppercase mt-9 mb-5 font-serif text-emerald-900 font-bold text-2xl">Login section</h1>
      <div className={style.container + ' font-serif'}>
        <form action={handleSubmit}>
          <div>
            <EmailValid email={email} setEmail={setEmail} />
          </div>
          <div className="relative">
            <PasswordValid password={password} setPassword={setPassword} />
          </div>
          <div className="flex gap-4 my-8">
            <span
              className={style.sentFormBtn}
              onClick={() => {
                setEmail('');
                setPassword('');
              }}
            >
              Reset form
            </span>
            <button
              className={style.sentFormBtn}
              onClick={() => {
                setAuthError('');
                setMsgVisible(false);
              }}
              type="submit"
              disabled={!formValid}
            >
              Submit form
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
