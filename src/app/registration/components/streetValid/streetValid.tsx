'use client';

import style from '../../page.module.css';
import { IAddress, IFormData } from '../../page';
import React, { useState } from 'react';
import InputValid from '../../elements/input/inputValid';

interface StreetProps {
  streetName: string;
  setFormData: React.Dispatch<React.SetStateAction<IAddress>>;
}

const infoInput = {
  type: 'text',
  name: 'streetName',
  pattern: '^.+$',
  textMistake: 'Must contain at least one character',
};

export default function StreetValid({ streetName, setFormData }: StreetProps) {
  const [error, setError] = useState('');

  return (
    <>
      <label className={style.labelInput}>
        Street:<span className="text-rose-600">*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <InputValid
          className={style.input}
          type="text"
          name={infoInput.name}
          value={streetName}
          pattern={infoInput.pattern}
          textMistake={infoInput.textMistake}
          setError={setError}
          setFormAddressData={setFormData}
        />
      </label>
    </>
  );
}
