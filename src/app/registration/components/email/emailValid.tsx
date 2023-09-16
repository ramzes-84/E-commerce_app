'use client';

import style from '../../page.module.css';
import React, { useState } from 'react';
import Label from '../../elements/wrapper';

interface EmailProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmailValid({ email, setEmail }: EmailProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setEmail(value);
    // setFormData(
    //   (prevState): DataObject => ({
    //     ...prevState,
    //     email: value,
    //   })
    // );
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
      <input
        type="text"
        name="email"
        multiple={false}
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        value={email}
        onChange={handleInputChange}
        className={style.input}
      />
      {error && (
        <div className="max-h-[40px]">
          <p className={style.errorMessage}>{error}</p>
        </div>
      )}
    </>
  );
}
