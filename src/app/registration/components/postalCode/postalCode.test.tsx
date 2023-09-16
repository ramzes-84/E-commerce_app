import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PostalCode from './postalCode';

describe('PostalCode component', () => {
  test('renders correctly', () => {
    render(<PostalCode country="US" postalCode="" onUpdate={() => {}} />);
    const postalCodeInput: HTMLInputElement = screen.getByRole('textbox');
    expect(postalCodeInput).toBeInTheDocument();
    expect(postalCodeInput).toHaveAttribute('type', 'text');
  });
  test('renders correctly if value is undefined', () => {
    render(<PostalCode country="US" postalCode={undefined} onUpdate={() => {}} />);
    const postalCodeInput: HTMLInputElement = screen.getByRole('textbox');
    expect(postalCodeInput).toHaveValue('');
  });

  test('updates value on input change', () => {
    render(<PostalCode country="US" postalCode="" onUpdate={() => {}} />);
    const postalCodeInput: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
  });

  test('show error message', () => {
    const { getByText } = render(<PostalCode country="US" postalCode="" onUpdate={() => {}} />);
    const postalCodeInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(postalCodeInput, { target: { value: '1234' } });
    expect(
      getByText('Enter the postal code in the format of your country without spaces, commas and dashes')
    ).toBeInTheDocument();
  });

  test('show error message', () => {
    const { getByText } = render(<PostalCode country="BY" postalCode="" onUpdate={() => {}} />);
    const postalCodeInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
    expect(
      getByText('Enter the postal code in the format of your country without spaces, commas and dashes')
    ).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { queryByText } = render(<PostalCode country="US" postalCode="" onUpdate={() => {}} />);
    const postalCodeInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
    expect(
      queryByText('Enter the postal code in the format of your country without spaces, commas and dashes')
    ).toBeNull();
  });
});
