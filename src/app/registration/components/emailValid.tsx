'use client'

import style from '../page.module.css'
import { IFormData } from '../page'
import React, { useState } from 'react'

interface EmailProps {
  email: string
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

export default function EmailValid({ email, setFormData }: EmailProps) {
  const [error, setError] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim()
    setFormData(
      (prevState): IFormData => ({
        ...prevState,
        email: value,
      })
    )
    if (!value) {
      setError('')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter email in format example@example.ex')
      return
    }
    setError('')
  }

  return (
    <>
      <label>
        Email:
        {error && <p className="error-message text-xs text-red-800">{error}</p>}
        <input
          type="email"
          name="email"
          multiple={false}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          value={email}
          onChange={handleEmailChange}
          className={style.input}
        />
      </label>
    </>
  )
}
