'use client'

import { registerUser } from '@/service/api/client'
import style from './page.module.css'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import SelectCountry from './components/selectCountry'
import PostalCode from './components/postalCode'

export interface IFormData {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  streetName: string
  city: string
  postalCode: string
  country: string
}

export default function Page() {
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const [formValid, setFormValid] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormData((prevFormData: IFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
    }))
  }

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const firstNameRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/
    const lastNameRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/
    const streetRegex = /^.+$/
    const cityRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/
    const postalCodeRegex = /^[1-90]{5,}$/
    const emailValid = emailRegex.test(formData.email)
    const passwordValid = passwordRegex.test(formData.password)
    const firstNameValid = firstNameRegex.test(formData.firstName)
    const lastNameValid = lastNameRegex.test(formData.lastName)
    const streetValid = streetRegex.test(formData.streetName)
    const cityValid = cityRegex.test(formData.city)
    const postalCodeValid = postalCodeRegex.test(formData.postalCode)
    setFormValid(
      emailValid && passwordValid && firstNameValid && lastNameValid && streetValid && cityValid && postalCodeValid
    )
  }, [formData])

  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formValid) {
      await registerUser(formData)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <>
      <div className={style.container}>
        <form id="formRegistr" onSubmit={handleRegistration}>
          <h2 className="text-center uppercase">Registration</h2>
          <div>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  multiple={false}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  value={formData.email}
                  onChange={handleChange}
                  className={style.input}
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  className={style.input}
                />
              </label>
              <span onClick={togglePasswordVisibility}>{passwordVisible ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            <div>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  pattern="^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$"
                  onChange={handleChange}
                  className={style.input}
                />
              </label>
            </div>
            <div>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  pattern="^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$"
                  onChange={handleChange}
                  className={style.input}
                />
              </label>
            </div>
            <div>
              <label>
                Date of birth:
                <input
                  className={style.input}
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  min="1900-01-01"
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split('T')[0]}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="adress-field">
              <h3 className="ml-2.5">Address fields:</h3>
              <div>
                <label>
                  Street:
                  <input
                    className={style.input}
                    type="text"
                    name="streetName"
                    pattern="^.+$"
                    value={formData.streetName}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  City:
                  <input
                    className={style.input}
                    type="text"
                    name="city"
                    pattern="^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Postal code:
                  <PostalCode country={formData.country} postalCode={formData.postalCode} setFormData={setFormData} />
                </label>
              </div>
              <div>
                <label>
                  Country:
                  <SelectCountry country={formData.country} setFormData={setFormData} />
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className={style.sentFormBtn} disabled={!formValid}>
            Register
          </button>
        </form>
      </div>
    </>
  )
}
