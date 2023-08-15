'use client'

import style from '../page.module.css'
import { IFormData } from '../page'
import React, { useState } from 'react'

interface PostalCodeProps {
  country: string
  postalCode: string
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export default function PostalCode({ country, postalCode, setFormData }: PostalCodeProps) {
  const [error, setError] = useState('');
  
  const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData((prevState) => ({
      ...prevState,
      postalCode: value,
    }));

    if (country === 'BY' || country === 'RU' || country === 'KZ') {
      if (!/^[1-90]{6}$/.test(value)) {
        setError('Неверный почтовый индекс');
        return;
      }
    } else {
      if (!/^[1-90]{5}$/.test(value)) {
        setError('Неверный почтовый индекс');
        return;
      }
    }
    setError('');
  }



  return (
    <>
      {error && <p className={'text-xs'}>{error}</p>}
      <input
        className={style.input}
        type="text"
        name="postalCode"
        value={postalCode}
        onChange={handlePostalCodeChange}
        pattern={country === 'BY' || country === 'RU' || country === 'KZ' ? '^[1-90]{6}$' : '^[1-90]{5}$'}
        title="Enter postal code without spaces, dashes and periods in the format 12345 for US/CZ/ES/DE or 123456 for RU/KZ/BY"
      />
    </>
  )
}
