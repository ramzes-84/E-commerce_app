'use client';

import style from '../../page.module.css';
import { IFormData } from '../../page';
import React, { useState } from 'react';
import Label from '../../elements/wrapper';

interface FirstNameProps {
  firstName: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const infoInput = {
  pattern: '^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$',
  textMistake: 'Must contain at least one character and no special characters or numbers',
};

export default function FirstNameValid({ firstName, setFormData }: FirstNameProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
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
    const regexp = new RegExp(infoInput.pattern);
    if (!regexp.test(value)) {
      setError(infoInput.textMistake);
      return;
    }
    setError('');
  };

  return (
    <>
      <Label label="First Name">
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type="text"
          name="firstName"
          pattern="^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$"
          value={firstName}
          onChange={handleInputChange}
          className={style.input}
        />
      </Label>
    </>
  );
}
