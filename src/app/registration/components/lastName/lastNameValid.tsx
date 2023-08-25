'use client';

import style from '../../page.module.css';
import { IAddress, IFormData } from '../../page';
import React, { useState } from 'react';
import InputValid from '../../elements/input/inputValid';

interface LastNameProps {
  lastName: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const infoInput = {
  type: 'text',
  name: 'lastName',
  pattern: '^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$',
  textMistake: 'Must contain at least one character and no special characters or numbers',
};

export default function LastNameValid({ lastName, setFormData }: LastNameProps) {
  const [error, setError] = useState('');

  return (
    <>
      <label className={style.labelInput}>
        Last Name:<span className="text-rose-600">*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <InputValid
          className={style.input}
          type={infoInput.type}
          name={infoInput.name}
          value={lastName}
          pattern={infoInput.pattern}
          textMistake={infoInput.textMistake}
          setError={setError}
          setFormData={setFormData}
        />
      </label>
    </>
  );
}
