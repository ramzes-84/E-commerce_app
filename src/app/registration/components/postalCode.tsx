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
  const [error, setError] = useState('')

  const handlePostalCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim()
    setFormData((prevState) => ({
      ...prevState,
      postalCode: value,
    }))
    if (!value) {
      setError('')
      return
    }
    if (country === 'BY' || country === 'RU' || country === 'KZ') {
      if (!/^[1-90]{6}$/.test(value)) {
        setError('Неверный почтовый индекс')
        return
      }
    } else {
      if (!/^[1-90]{5}$/.test(value)) {
        setError('Неверный почтовый индекс')
        return
      }
    }
    setError('')
  }

  return (
    <>
      <label>
        Postal code:
        {error && <p className="error-message text-xs text-red-800">{error}</p>}
        <input
          className={style.input}
          type="text"
          name="postalCode"
          value={postalCode}
          onChange={handlePostalCodeChange}
          pattern={country === 'BY' || country === 'RU' || country === 'KZ' ? '^[1-90]{6}$' : '^[1-90]{5}$'}
        />
      </label>
    </>
  )
}
