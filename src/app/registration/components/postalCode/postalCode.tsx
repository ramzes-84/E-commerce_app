'use client';

import { IMyAddress } from '@/service/api/CustomerService';
import style from '../../page.module.css';
import React, { useState } from 'react';

interface PostalCodeProps {
  country: string;
  postalCode?: string;
  setFormData: React.Dispatch<React.SetStateAction<IMyAddress>>;
}

const infoInput = {
  patternSixNum: '^[1-90]{6}$',
  patternSFiveNum: '^[1-90]{5}$',
  textMistake: 'Enter the postal code in the format of your country without spaces, commas and dashes',
};

export default function PostalCode({ country, postalCode, setFormData }: PostalCodeProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData((prevState) => ({
      ...prevState,
      postalCode: value,
    }));
    if (!value) {
      setError('');
      return;
    }
    if (country === 'BY' || country === 'RU' || country === 'KZ') {
      const regexp = new RegExp(infoInput.patternSixNum);
      if (!regexp.test(value)) {
        setError(infoInput.textMistake);
        return;
      }
    } else {
      const regexp = new RegExp(infoInput.patternSFiveNum);
      if (!regexp.test(value)) {
        setError(infoInput.textMistake);
        return;
      }
    }
    setError('');
  };

  return (
    <>
      {error && <p className={style.errorMessage}>{error}</p>}
      <input
        className={style.input}
        type="text"
        name="postalCode"
        value={postalCode ?? ''}
        onChange={handleInputChange}
        pattern={country === 'BY' || country === 'RU' || country === 'KZ' ? '^[1-90]{6}$' : '^[1-90]{5}$'}
      />
    </>
  );
}
