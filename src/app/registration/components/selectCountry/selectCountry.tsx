'use client';

import { IMyAddress } from '@/service/api/CustomerService';
import style from '../../page.module.css';
import React, { useState } from 'react';

interface CountryProps {
  country: string;
  // setFormData: React.Dispatch<React.SetStateAction<IMyAddress>>;
  onUpdate: (street: string) => void;
}

export default function SelectCountry({ country, onUpdate }: CountryProps) {
  const [countryState, setCountryState] = useState(country);
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    setCountryState(value);
    // setFormData((prevState) => ({
    //   ...prevState,
    //   country: event.target.value,
    // }));
    onUpdate(value);
  };
  return (
    <>
      <select
        className={style.selectCountry}
        name="country"
        form="formRegistr"
        value={countryState}
        onChange={handleCountryChange}
      >
        <option>Select a country</option>
        <option value="BY">Belarus</option>
        <option value="CZ">Czechia</option>
        <option value="DE">Germany</option>
        <option value="KZ">Kazakhstan</option>
        <option value="RU">Russia</option>
        <option value="ES">Spain</option>
        <option value="US">United States</option>
      </select>
    </>
  );
}
