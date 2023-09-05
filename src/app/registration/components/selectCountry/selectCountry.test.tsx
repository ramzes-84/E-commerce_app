import React, { Dispatch } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SelectCountry from './selectCountry';
import { IMyAddress } from '@/service/api/CustomerService';

describe('SelectCountry component', () => {
  const setFormData: Dispatch<React.SetStateAction<IMyAddress>> = jest.fn();

  test('renders correctly', () => {
    render(<SelectCountry country="" onUpdate={() => {}} />);
    const countrySelect: HTMLInputElement = screen.getByRole('combobox');
    expect(countrySelect).toBeInTheDocument();
  });

  test('displays all options', () => {
    const { getByText } = render(<SelectCountry country="" onUpdate={() => {}} />);
    expect(getByText('Select a country')).toBeInTheDocument();
    expect(getByText('Belarus')).toBeInTheDocument();
    expect(getByText('Czechia')).toBeInTheDocument();
  });

  test('updates country value on select', () => {
    render(<SelectCountry country="" onUpdate={() => {}} />);
    const countrySelect: HTMLInputElement = screen.getByRole('combobox');
    fireEvent.change(countrySelect, { target: { value: 'US' } });
  });
});
