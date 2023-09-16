'use client';

import { IMyAddress } from '@/service/api/CustomerService';
import style from '../../page.module.css';
import React, { useState } from 'react';

interface StreetProps {
  streetName?: string;
  onUpdate: (street: string) => void;
}

const infoInput = {
  pattern: '^.+$',
  textMistake: 'Must contain at least one character',
};

export default function StreetValid({ streetName, onUpdate }: StreetProps) {
  const [error, setError] = useState('');
  const [street, setStreet] = useState(streetName);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setStreet(value);
    if (!value) {
      setError('');
      return;
    }
    const regexp = new RegExp(infoInput.pattern);
    if (!regexp.test(value)) {
      setError(infoInput.textMistake);
      return;
    }
    onUpdate(value);
    setError('');
  };

  return (
    <>
      <input
        type="text"
        name="streetName"
        pattern="^.+$"
        value={street ?? ''}
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
