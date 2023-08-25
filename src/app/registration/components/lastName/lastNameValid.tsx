'use client';

import style from '../../page.module.css';
import { IFormData } from '../../page';
import React, { useState } from 'react';

interface LastNameProps {
  lastName: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const infoInput = {
  pattern: '^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$',
  textMistake: 'Must contain at least one character and no special characters or numbers',
};

export default function LastNameValid({ lastName, setFormData }: LastNameProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        lastName: value,
      })
    );
    if (!value) {
      setError('');
      return;
    }
    const regexp = new RegExp(infoInput.pattern);
    if (!regexp.test(value)) {
      setError(infoInput.textMistake);
      return;
    }
    setError('');
  };

  return (
    <>
      <label className={style.labelInput}>
        Last Name:<span className="text-rose-600">*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type="text"
          name="lastName"
          pattern="^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$"
          value={lastName}
          onChange={handleInputChange}
          className={style.input}
        />
      </label>
    </>
  );
}
