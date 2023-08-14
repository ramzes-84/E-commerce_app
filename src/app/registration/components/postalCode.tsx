'use client'

import style from '../page.module.css'
import { IFormData } from "../page";
import React from 'react';

interface PostalCodeProps {
  country: string,
  postalCode: string,
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
}

export default function PostalCode({country, postalCode, setFormData}: PostalCodeProps) {
  const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevState) => ({
      ...prevState,
      postalCode: event.target.value.trim(),
    }));
  }

  return (
    <input
      className={style.input}
      type="text"
      name="postalCode"
      value={postalCode}
      onChange={handlePostalCodeChange}
      pattern={(country === 'BY' || country === 'RU' || country === 'KZ') ? '^[1-90]{6}$' : '^[1-90]{5}$'}
    />
  )
}