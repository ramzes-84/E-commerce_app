'use client'

import { registerUser } from '@/service/api/client'
import style from './page.module.css'
import React, { useEffect, useState } from 'react'
import SelectCountry from './components/selectCountry'
import PostalCode from './components/postalCode'
import EmailValid from './components/emailValid'
import PasswordValid from './components/passwordValid'
import FirstNameValid from './components/firstNameValid'
import LastNameValid from './components/lastNameValid'
import StreetValid from './components/streetValid'
import CityValid from './components/cityValid'
import DataOfBirthValid from './components/dataOfBirthValid'

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

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const firstNameRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/
    const lastNameRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/
    const streetRegex = /^.+$/
    const cityRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ])[a-zA-Za-яА-ЯёЁ]{1,}$/
    const postalCodeRegex = /^[1-90]{5,}$/
    const countryRegex = /^.+$/
    const emailValid = emailRegex.test(formData.email)
    const passwordValid = passwordRegex.test(formData.password)
    const firstNameValid = firstNameRegex.test(formData.firstName)
    const lastNameValid = lastNameRegex.test(formData.lastName)
    const streetValid = streetRegex.test(formData.streetName)
    const cityValid = cityRegex.test(formData.city)
    const postalCodeValid = postalCodeRegex.test(formData.postalCode)
    const countryValid = countryRegex.test(formData.country)
    setFormValid(
      emailValid && passwordValid && firstNameValid && lastNameValid && streetValid && cityValid && postalCodeValid && countryValid
    )
  }, [formData])

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formValid) {
      await registerUser(formData)
    }
  }

  return (
    <>
      <div className={style.container}>
        <form id="formRegistr" onSubmit={handleRegistration}>
          <h2 className="text-center uppercase">Registration</h2>
          <div>
            <div>
              <EmailValid email={formData.email} setFormData={setFormData}/>
            </div>
            <div>
              <PasswordValid password={formData.password} setFormData={setFormData}/>
            </div>
            <div>
              <FirstNameValid firstName={formData.firstName} setFormData={setFormData}/>
            </div>
            <div>
              <LastNameValid lastName={formData.lastName} setFormData={setFormData}/>
            </div>
            <div>
              <DataOfBirthValid dateOfBirth={formData.dateOfBirth} setFormData={setFormData}/>
            </div>
            <div className="adress-field">
              <h3 className="ml-2.5">Address fields:</h3>
              <div>
                <StreetValid streetName={formData.streetName} setFormData={setFormData}/>
              </div>
              <div>
                <CityValid city={formData.city} setFormData={setFormData}/>
              </div>
              <div>
                  <PostalCode country={formData.country} postalCode={formData.postalCode} setFormData={setFormData} />
              </div>
              <div>
                  <SelectCountry country={formData.country} setFormData={setFormData} />
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
