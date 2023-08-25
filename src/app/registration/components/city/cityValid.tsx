'use client';

import style from '../../page.module.css';
import { IAddress, IFormData } from '../../page';
import React, { useState } from 'react';
import InputValid from '../../elements/input/inputValid';

interface CityProps {
  city: string;
  setFormData: React.Dispatch<React.SetStateAction<IAddress>>;
}

const infoInput = {
  type: 'text',
  name: 'city',
  pattern: '^([a-zA-Zа-яА-Я]+-?s*)+$',
  textMistake: 'Must contain at least one character and no special characters or numbers',
};

export default function CityValid({ city, setFormData }: CityProps) {
  const [error, setError] = useState('');

  return (
    <>
      <label className={style.labelInput}>
        City:<span className="text-rose-600">*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <InputValid
          className={style.input}
          type={infoInput.type}
          name={infoInput.name}
          value={city}
          pattern={infoInput.pattern}
          textMistake={infoInput.textMistake}
          setError={setError}
          setFormAddressData={setFormData}
        />
      </label>
    </>
  );
}
