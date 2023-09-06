'use client';

import style from '../../page.module.css';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordProps {
  password?: string;
  onUpdate: (street: string) => void;
}

export default function PasswordValid({ password: currentPassword, onUpdate }: PasswordProps) {
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState(currentPassword);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setPassword(value);
    if (!value) {
      setError('');
      return;
    }
    if (!/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$/.test(value)) {
      setError('Min 8 characters, at least 1 uppercase letter and 1 lowercase letter and 1 number');
      return;
    }
    onUpdate(value);
    setError('');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <input
        type={passwordVisible ? 'text' : 'password'}
        name="password"
        pattern="^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$"
        minLength={8}
        value={password ?? ''}
        onChange={handleInputChange}
        className={style.input}
      />
      <button className="absolute top-[28px] right-2" onClick={togglePasswordVisibility} type="button">
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
      {error && (
        <div className="max-h-[40px]">
          <p className={style.errorMessage}>{error}</p>
        </div>
      )}
    </>
  );
}
