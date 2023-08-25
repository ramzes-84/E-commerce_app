'use client';

import style from '../../page.module.css';
import { IFormData } from '../../page';
import React, { useState } from 'react';
import Label from '../../elements/wrapper';

interface EmailProps {
  email: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export default function EmailValid({ email, setFormData }: EmailProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        email: value,
      })
    );
    if (!value) {
      setError('');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter email in format example@example.ex without leading or trailing whitespace');
      return;
    }
    setError('');
  };

  return (
    <>
      <Label label="Email">
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type="text"
          name="email"
          multiple={false}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          value={email}
          onChange={handleInputChange}
          className={style.input}
        />
      </Label>
    </>
  );
}
