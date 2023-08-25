'use client';

import style from '../../page.module.css';
import { IAddress, IFormData } from '../../page';
import React, { useState } from 'react';
import InputValid from '../../elements/input/inputValid';

interface EmailProps {
  email: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const infoInput = {
  type: 'text',
  name: 'email',
  pattern: '^[^s@]+@[^s@]+.[^s@]+$',
  textMistake: 'Enter email in format example@example.ex',
};

export default function EmailValid({ email, setFormData }: EmailProps) {
  const [error, setError] = useState('');

  return (
    <>
      <label className={style.labelInput}>
        Email: <span className="text-rose-600">*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <InputValid
          className={style.input}
          type={infoInput.type}
          name={infoInput.name}
          value={email}
          pattern={infoInput.pattern}
          textMistake={infoInput.textMistake}
          setError={setError}
          setFormData={setFormData}
        />
      </label>
    </>
  );
}
