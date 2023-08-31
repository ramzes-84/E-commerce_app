'use client';

import style from '../../page.module.css';
import React, { useState } from 'react';

interface LastNameProps {
  lastName?: string;
  setLastName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const infoInput = {
  pattern: '^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$',
  textMistake: 'Must contain at least one character and no special characters or numbers',
};

export default function LastNameValid({ lastName, setLastName }: LastNameProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setLastName(value);
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
      {error && <p className={style.errorMessage}>{error}</p>}
      <input
        type="text"
        name="lastName"
        pattern="^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$"
        value={lastName ?? ''}
        onChange={handleInputChange}
        className={style.input}
        data-testid="lastName-input"
      />
    </>
  );
}
