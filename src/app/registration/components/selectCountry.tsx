import React from "react";

export default function SelectCountry() {
  const [selectedCountry, setSelectedCountry] = React.useState('');

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
  }
  return (
    <select name="country" form="formRegistr" value={selectedCountry} onChange={handleCountryChange}>
      <option value="II">Select a country</option>
      <option value="BY">Belarus</option>
      <option value="CZ">Czechia</option>
      <option value="DE">Germany</option>
      <option value="KZ">Kazakhstan</option>
      <option value="RU">Russia</option>
      <option value="ES">Spain</option>
      <option value="US">Unated States</option>
    </select>
  )
}
