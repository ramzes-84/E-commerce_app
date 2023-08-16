'use client'

import style from '../page.module.css'
import { IFormData } from '../page'
import React, { useState } from 'react'

interface LastNameProps {
  lastName: string
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export default function LastNameValid({ lastName, setFormData }: LastNameProps) {
  const [error, setError] = useState('')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim()
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        lastName: value,
      })
    )
    if (!value) {
      setError('')
      return
    }
    if (!/^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/.test(value)) {
      setError('Must contain at least one character and no special characters or numbers')
      return
    }
    setError('')
  }

  return (
    <>
      <label className={style.labelInput}>
        Last Name:
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type="text"
          name="lastName"
          value={lastName}
          pattern="^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$"
          onChange={handleNameChange}
          className={style.input}
        />
      </label>
    </>
  )
}
