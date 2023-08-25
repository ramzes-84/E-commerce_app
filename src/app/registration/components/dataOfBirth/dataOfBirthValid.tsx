'use client';

import style from '../../page.module.css';
import { IAddress, IFormData } from '../../page';
import React from 'react';
import InputValid from '../../elements/input/inputValid';

interface DataOfBirthProps {
  dateOfBirth: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const infoInput = {
  type: 'date',
  name: 'dateOfBirth',
  pattern: '',
};

export default function DataOfBirthValid({ dateOfBirth, setFormData }: DataOfBirthProps) {
  return (
    <label>
      Date of birth:<span className="text-rose-600">*</span>
      <InputValid
        className={style.input}
        type={infoInput.type}
        name={infoInput.name}
        value={dateOfBirth}
        pattern={infoInput.pattern}
        min="1900-01-01"
        max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
        setFormData={setFormData}
      />
    </label>
  );
}
