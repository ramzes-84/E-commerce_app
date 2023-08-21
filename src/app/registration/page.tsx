'use client';

import style from './page.module.css';
import React, { useEffect, useState } from 'react';
import EmailValid from './components/email/emailValid';
import PasswordValid from './components/password/passwordValid';
import FirstNameValid from './components/firstName/firstNameValid';
import LastNameValid from './components/lastName/lastNameValid';
import DataOfBirthValid from './components/dataOfBirth/dataOfBirthValid';
import { autoLogin, register } from './register-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ShippingAddress from './components/sippingAddress/shippingAddress';
import BillingAddress from './components/billingAddress/billingAddress';
import CheckboxAddress from './components/checkbox/checkbox';

export interface IFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface IAddress {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const [formShippingAddress, setFormShippingAddress] = useState<IAddress>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    defaultShippingAddress: false,
  });

  const [formBillingAddress, setFormBillingAddress] = useState<IAddress>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    defaultBillingAddress: false,
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const styleColumns = !isChecked
    ? ' column-1 gap-6 lg:columns-3 md:columns-1 font-serif mb-6 '
    : ' column-1 gap-6 lg:columns-2 md:columns-1 font-serif mb-6 ';

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
    const streetValid = streetRegex.test(formShippingAddress.streetName);
    const cityValid = cityRegex.test(formShippingAddress.city);
    const postalCodeValid = postalCodeRegex.test(formShippingAddress.postalCode);
    const countryValid = countryRegex.test(formShippingAddress.country);
    const streetValidBilling = streetRegex.test(formBillingAddress.streetName);
    const cityValidBilling = cityRegex.test(formBillingAddress.city);
    const postalCodeValidBilling = postalCodeRegex.test(formBillingAddress.postalCode);
    const countryValidBilling = countryRegex.test(formBillingAddress.country);
    setFormValid(
      emailValid &&
        passwordValid &&
        firstNameValid &&
        lastNameValid &&
        streetValid &&
        cityValid &&
        postalCodeValid &&
        countryValid &&
        streetValidBilling &&
        cityValidBilling &&
        postalCodeValidBilling &&
        countryValidBilling
    );
  }, [formData, formShippingAddress, formBillingAddress]);

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let shippingAddress = formShippingAddress;
    let billingAddress;
    isChecked ? (billingAddress = shippingAddress) : (billingAddress = formBillingAddress);
    if (formValid) {
      await register(formData, shippingAddress, billingAddress)
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
  const styled = regSuccess ? ' bg-[#c0e7b9] ' : ' bg-red-200';
  const msg = regError ? regError : 'Registation successful!';
  return (
    <>
      <p className={msgVisible ? `${styled}` : 'hidden'}>{msg}</p>
      <div className={style.container}>
        <form id="formRegistr" onSubmit={handleRegistration}>
          <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Registration</h2>
          <div className={styleColumns}>
            <div>
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
            </div>
            <ShippingAddress
              formShippingAddress={formShippingAddress}
              setFormShippingAddress={setFormShippingAddress}
            />
            <CheckboxAddress label="Use for Billing address" checked={isChecked} onChange={handleCheckboxChange} />
            {!isChecked && (
              <BillingAddress formBillingAddress={formBillingAddress} setFormBillingAddress={setFormBillingAddress} />
            )}
          </div>
          <button
            onClick={() => {
              setMsgVisible(false);
              setRegError('');
            }}
            type="submit"
            className={style.sentFormBtn}
            disabled={!formValid}
          >
            Register
          </button>
        </form>
      </div>
      <div className="flex w-auto h-20 items-center justify-center my-6 ">
        <p className="font-serif text-lg text-emerald-900 mx-10">Already have an account?</p>
        <Link
          className=" font-serif cursor-pointer leading-none px-6 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-lg"
          href="/login"
        >
          Log in
        </Link>
      </div>
    </>
  );
}
