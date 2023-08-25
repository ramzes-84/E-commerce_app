'use client';

import style from '../../page.module.css';
import { IAddress } from '../../page';
import React, { useState } from 'react';
import Label from '../../elements/wrapper';

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
      <Label label="Street">
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type="text"
          name="streetName"
          pattern="^.+$"
          value={streetName}
          onChange={handleInputChange}
          className={style.input}
        />
      </Label>
    </>
  );
}
