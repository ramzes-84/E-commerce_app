'use client';

import style from '../../page.module.css';
import { IAddress } from '../../page';
import React, { useState } from 'react';

interface StreetProps {
  streetName: string;
  setFormData: React.Dispatch<React.SetStateAction<IAddress>>;
}

const infoInput = {
  pattern: '^.+$',
  textMistake: 'Must contain at least one character',
};

export default function StreetValid({ streetName, setFormData }: StreetProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData(
      (prevState): IAddress => ({
        ...prevState,
        streetName: value,
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
        Street:<span className="text-rose-600">*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type="text"
          name="streetName"
          pattern="^.+$"
          value={streetName}
          onChange={handleInputChange}
          className={style.input}
        />
      </label>
    </>
  );
}
