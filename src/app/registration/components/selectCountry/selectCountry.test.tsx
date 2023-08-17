import React, { Dispatch } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IFormData } from '../../page';
import SelectCountry from './selectCountry';

describe('SelectCountry component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormData>> = jest.fn();

  test('renders correctly', () => {
    const { getByLabelText } = render(<SelectCountry country="" setFormData={setFormData} />);
    const countrySelect = getByLabelText('Country:');
    expect(countrySelect).toBeInTheDocument();
  });

  test('displays all options', () => {
    const { getByText } = render(<SelectCountry country="" setFormData={setFormData} />);
    expect(getByText('Select a country')).toBeInTheDocument();
    expect(getByText('Belarus')).toBeInTheDocument();
    expect(getByText('Czechia')).toBeInTheDocument();
  });

  test('updates country value on select', () => {
    const { getByLabelText } = render(<SelectCountry country="" setFormData={setFormData} />);
    const countrySelect = getByLabelText('Country:');
    fireEvent.change(countrySelect, { target: { value: 'US' } });
  });
});
