'use client';

import style from '../../page.module.css';
import { IFormData } from '../../page';
import React from 'react';

interface DataOfBirthProps {
  dateOfBirth: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export default function DataOfBirthValid({ dateOfBirth, setFormData }: DataOfBirthProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevState) => ({
      ...prevState,
      dateOfBirth: event.target.value,
    }));
  };

  return (
    <label>
      Date of birth:<span className="text-rose-600">*</span>
      <input
        type="date"
        name="dateOfBirth"
        min="1900-01-01"
        max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
        value={dateOfBirth}
        onChange={handleInputChange}
        className={style.input}
      />
    </label>
  );
}
