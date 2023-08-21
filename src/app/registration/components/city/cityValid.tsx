'use client';

import style from '../../page.module.css';
import { IAddress } from '../../page';
import React, { useState } from 'react';

interface CityProps {
  city: string;
  setFormData: React.Dispatch<React.SetStateAction<IAddress>>;
}

export default function CityValid({ city, setFormData }: CityProps) {
  const [error, setError] = useState('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setFormData(
      (prevState): IAddress => ({
        ...prevState,
        city: value,
      })
    );
    if (!value) {
      setError('');
      return;
    }
    if (!/^([a-zA-Zа-яА-Я]+-?\s*)+$/.test(value)) {
      setError('Must contain at least one character and no special characters or numbers');
      return;
    }
    setError('');
  };

  return (
    <>
      <label className={style.labelInput}>
        City:<span className="text-rose-600">*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          className={style.input}
          type="text"
          name="city"
          pattern="^([a-zA-Zа-яА-Я]+-?\s*)+$"
          value={city}
          onChange={handleCityChange}
        />
      </label>
    </>
  );
}
