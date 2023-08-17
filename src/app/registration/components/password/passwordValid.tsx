'use client';

import style from '../../page.module.css';
import { IFormData } from '../../page';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordProps {
  password: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export default function PasswordValid({ password, setFormData }: PasswordProps) {
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        password: value,
      })
    );
    if (!value) {
      setError('');
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
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
          name="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
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
