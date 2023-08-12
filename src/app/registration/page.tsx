'use client'

import { IFormData, apiRoot, registerUser } from '@/service/api/client'
import style from './page.module.css'
import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import SelectCountry from './components/selectCountry'

export default function Page() {
  const [formData, setFormData] = React.useState<IFormData>({
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData: IFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
    }))
  }

  const [passwordVisible, setPasswordVisible] = React.useState(false)

  // const emailRef = React.useRef(email)

  // React.useEffect(() => {
  //   emailRef.current = email
  // }, [email])

  const handleRegistration = async () => {
    const response = await registerUser(formData)
    console.log(response)

    let user // при настройке API здесь будем искать нужного user и сравнивать со значением поля email
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <>
      <div className={style.container}>
        <form action="POST" onSubmit={handleRegistration}>
          <h2 className="text-center">Registration</h2>
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
                  <input
                    className={style.input}
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Country:
                  <SelectCountry />
                  <input
                    className={style.input}
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className={style.sentFormBtn}>
            Register
          </button>
        </form>
      </div>
    </>
  )
}
