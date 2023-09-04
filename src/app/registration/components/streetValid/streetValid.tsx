'use client';

import { IMyAddress } from '@/service/api/CustomerService';
import style from '../../page.module.css';
import React, { useState } from 'react';

interface StreetProps {
  streetName?: string;
  setFormData: React.Dispatch<React.SetStateAction<IMyAddress>>;
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
      (prevState): IMyAddress => ({
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
      <input
        type="text"
        name="streetName"
        pattern="^.+$"
        value={streetName ?? ''}
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
