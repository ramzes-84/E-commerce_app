'use client';

import style from '../../page.module.css';
import { IFormData } from '../../page';
import React, { useState } from 'react';

interface FirstNameProps {
  firstName: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export default function FirstNameValid({ firstName, setFormData }: FirstNameProps) {
  const [error, setError] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        firstName: value,
      })
    );
    if (!value) {
      setError('');
      return;
    }
    if (!/^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/.test(value)) {
      setError('Must contain at least one character and no special characters or numbers');
      return;
    }
    setError('');
  };

  return (
    <>
      <label className={style.labelInput}>
        First Name:
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type="text"
          name="firstName"
          value={firstName}
          pattern="^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$"
          onChange={handleNameChange}
          className={style.input}
        />
      </label>
    </>
  );
}
