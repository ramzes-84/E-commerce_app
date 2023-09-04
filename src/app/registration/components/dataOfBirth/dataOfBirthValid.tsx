'use client';

import style from '../../page.module.css';
import React from 'react';

interface DataOfBirthProps {
  dateOfBirth?: string;
  setDateOfBirth: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function DataOfBirthValid({ dateOfBirth, setDateOfBirth }: DataOfBirthProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDateOfBirth(event.target.value);
  };

  return (
    <>
      <input
        type="date"
        name="dateOfBirth"
        min="1900-01-01"
        max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
        value={dateOfBirth ?? ''}
        onChange={handleInputChange}
        className={style.input}
      />
    </>
  );
}
