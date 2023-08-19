'use client';

import style from './page.module.css';
import React, { useEffect, useState } from 'react';
import SelectCountry from './components/selectCountry/selectCountry';
import PostalCode from './components/postalCode/postalCode';
import EmailValid from './components/email/emailValid';
import PasswordValid from './components/password/passwordValid';
import FirstNameValid from './components/firstName/firstNameValid';
import LastNameValid from './components/lastName/lastNameValid';
import StreetValid from './components/streetValid/streetValid';
import CityValid from './components/city/cityValid';
import DataOfBirthValid from './components/dataOfBirth/dataOfBirthValid';
import { autoLogin, register } from './register-actions';
import { useRouter } from 'next/navigation';

export interface IFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function Page() {
  const router = useRouter();
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
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    const firstNameRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$/;
    const lastNameRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$/;
    const streetRegex = /^.+$/;
    const cityRegex = /^([a-zA-Zа-яА-Я]+-?\s*)+$/;
    const postalCodeRegex = /^[1-90]{5,}$/;
    const countryRegex = /^.+$/;
    const emailValid = emailRegex.test(formData.email);
    const passwordValid = passwordRegex.test(formData.password);
    const firstNameValid = firstNameRegex.test(formData.firstName);
    const lastNameValid = lastNameRegex.test(formData.lastName);
    const streetValid = streetRegex.test(formData.streetName);
    const cityValid = cityRegex.test(formData.city);
    const postalCodeValid = postalCodeRegex.test(formData.postalCode);
    const countryValid = countryRegex.test(formData.country);
    setFormValid(
      emailValid &&
        passwordValid &&
        firstNameValid &&
        lastNameValid &&
        streetValid &&
        cityValid &&
        postalCodeValid &&
        countryValid
    );
  }, [formData]);

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValid) {
      await register(formData)
        .then(() => {
          autoLogin(formData);
          setRegSuccess(true);
          setMsgVisible(true);
        })
        .catch((err) => {
          setRegError(`\u{26A0} There was an error. ${err.message} \u{26A0}`);
          setMsgVisible(true);
        });
    }
  };
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);
  if (regSuccess)
    setTimeout(() => {
      router.push('/');
    }, 1000);
  const styled = regSuccess ? " bg-emerald-200 " : " bg-red-200";
  return (
    <>
      <p className={msgVisible ? `${styled}` : 'hidden'}>{regError ? regError : 'Registation successful!'}</p>
      <div className={style.container}>
        <form id="formRegistr" onSubmit={handleRegistration}>
          <h2 className="text-center uppercase">Registration</h2>
          <div >
            <div>
              <EmailValid email={formData.email} setFormData={setFormData} />
            </div>
            <div className="relative">
              <PasswordValid password={formData.password} setFormData={setFormData} />
            </div>
            <div>
              <FirstNameValid firstName={formData.firstName} setFormData={setFormData} />
            </div>
            <div>
              <LastNameValid lastName={formData.lastName} setFormData={setFormData} />
            </div>
            <div>
              <DataOfBirthValid dateOfBirth={formData.dateOfBirth} setFormData={setFormData} />
            </div>
            <div className="adress-field">
              <h3 className="ml-2.5">Address fields:</h3>
              <div>
                <StreetValid streetName={formData.streetName} setFormData={setFormData} />
              </div>
              <div>
                <CityValid city={formData.city} setFormData={setFormData} />
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
  );
}
