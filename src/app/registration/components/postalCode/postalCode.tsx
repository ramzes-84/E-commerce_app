'use client';

import style from '../../page.module.css';
import { IAddress } from '../../page';
import React, { useState } from 'react';

interface PostalCodeProps {
  country: string;
  postalCode: string;
  setFormData: React.Dispatch<React.SetStateAction<IAddress>>;
}

export default function PostalCode({ country, postalCode, setFormData }: PostalCodeProps) {
  const [error, setError] = useState('');

  const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
      if (!/^[1-90]{6}$/.test(value)) {
        setError('Enter the postal code in the format of your country without spaces, commas and dashes');
        return;
      }
    } else {
      if (!/^[1-90]{5}$/.test(value)) {
        setError('Enter the postal code in the format of your country without spaces, commas and dashes');
        return;
      }
    }
    setError('');
  };

  return (
    <>
      <label className={style.labelInput}>
        Postal code:<span className='text-rose-600'>*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          className={style.input}
          type="text"
          name="postalCode"
          value={postalCode}
          onChange={handlePostalCodeChange}
          pattern={country === 'BY' || country === 'RU' || country === 'KZ' ? '^[1-90]{6}$' : '^[1-90]{5}$'}
        />
      </label>
    </>
  );
}
