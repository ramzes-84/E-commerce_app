'use client';

import style from '../../page.module.css';
import React, { useState } from 'react';

interface FirstNameProps {
  firstName?: string;
  setFirstName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const infoInput = {
  pattern: '^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$',
  textMistake: 'Must contain at least one character and no special characters or numbers',
};

export default function FirstNameValid({ firstName, setFirstName }: FirstNameProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFirstName(value);
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
        name="firstName"
        pattern="^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$"
        value={firstName}
        onChange={handleInputChange}
        className={style.input}
        data-testid='firstName-input'
      />
    </>
  );
}
