'use client';

import style from '../../page.module.css';
import { IFormData } from '../../page';
import React from 'react';

interface DataOfBirthProps {
  dateOfBirth: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export default function DataOfBirthValid({ dateOfBirth, setFormData }: DataOfBirthProps) {
  const handleBirthChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        dateOfBirth: value,
      })
    );
  };

  return (
    <label>
      Date of birth:
      <input
        className={style.input}
        type="date"
        name="dateOfBirth"
        value={dateOfBirth}
        min="1900-01-01"
        max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
        onChange={handleBirthChange}
      />
    </label>
  );
}
