'use client';

import style from '../../../registration/page.module.css';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IFormDataLogin } from '../../LoginForm';

interface PasswordProps {
  password: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormDataLogin>>;
}

export default function PasswordValidLogin({ password, setFormData }: PasswordProps) {
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData(
      (prevState): IFormDataLogin => ({
        ...prevState,
        password: value,
      })
    );
    if (!value) {
      setError('');
      return;
    }
    if (!/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$/.test(value)) {
      setError('Min 8 characters, at least 1 uppercase letter and 1 lowercase letter and 1 number');
      return;
    }
    setError('');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <label className={style.labelInput}>
        Password:
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type={passwordVisible ? 'text' : 'password'}
          name="pass"
          pattern="^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$"
          minLength={8}
          value={password}
          onChange={handlePasswordChange}
          className={style.input}
        />
      </label>
      <button className="absolute bottom-3.5 right-1" onClick={togglePasswordVisibility}>
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </>
  );
}
