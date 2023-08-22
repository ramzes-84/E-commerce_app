'use client';

import style from '../registration/page.module.css';
import React, { useEffect } from 'react';
import { login } from './login-actions';
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
  const [loginSuccess, setLogingSuccess] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);

  const styled = loginSuccess ? ' bg-[#c0e7b9] ' : ' bg-red-200';
  const msg = authError ? authError : 'Log in successful!';

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    const emailValid = emailRegex.test(formData.email);
    const passwordValid = passwordRegex.test(formData.password);
    setFormValid(emailValid && passwordValid);
  }, [formData]);

  async function handleSubmit(formData: FormData) {
    const formJson = Object.fromEntries(formData.entries());
    await login(formJson.name.toString(), formJson.pass.toString())
      .then(() => {
        setLogingSuccess(true);
        setMsgVisible(true);
      })
      .catch((err: Error) => {
        const errorDesc = err.message;
        setAuthError(
          `\u{26A0} There was an error during authorization. There is no user with provided credentials. ${errorDesc} \u{26A0}`
        );
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
            <EmailLoginValid email={formData.email} setFormData={setFormData} />
          </div>
          <div className="relative">
            <PasswordValidLogin password={formData.password} setFormData={setFormData} />
          </div>
          <div className="flex gap-4 my-8">
            <span className={style.sentFormBtn} onClick={() => setFormData({ email: '', password: '' })}>
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
