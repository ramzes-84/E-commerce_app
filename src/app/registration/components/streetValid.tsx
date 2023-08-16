'use client'

import style from '../page.module.css'
import { IFormData } from '../page'
import React, { useState } from 'react'

interface StreetProps {
  streetName: string
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export default function StreetValid({ streetName, setFormData }: StreetProps) {
  const [error, setError] = useState('')

  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim()
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        streetName: value,
      })
    )
    if (!value) {
      setError('')
      return
    }
    if (!/^.+$/.test(value)) {
      setError('Must contain at least one character')
      return
    }
    setError('')
  }

  return (
    <>
      <label>
        Street:
        {error && <p className="error-message text-xs text-red-800">{error}</p>}
        <input
          className={style.input}
          type="text"
          name="streetName"
          pattern="^.+$"
          value={streetName}
          onChange={handleStreetChange}
        />
      </label>
    </>
  )
}
