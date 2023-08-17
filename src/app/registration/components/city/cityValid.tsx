'use client';

import style from '../../page.module.css';
import { IFormData } from '../../page';
import React, { useState } from 'react';

interface CityProps {
  city: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export default function CityValid({ city, setFormData }: CityProps) {
  const [error, setError] = useState('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        city: value,
      })
    );
    if (!value) {
      setError('');
      return;
    }
    if (!/^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/.test(value)) {
      setError('Must contain at least one character and no special characters or numbers');
      return;
    }
    setError('');
  };

  return (
    <>
      <label className={style.labelInput}>
        City:
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          className={style.input}
          type="text"
          name="city"
          pattern="^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$"
          value={city}
          onChange={handleCityChange}
        />
      </label>
    </>
  );
}
