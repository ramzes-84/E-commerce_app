import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Page from './page';
import { useRouter } from 'next/navigation';
jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

describe('Page component', () => {
  test('should render registration form', () => {
    const { getByText, getByLabelText } = render(<Page />);
    expect(getByText('Registration')).toBeInTheDocument();
    expect(getByLabelText('Email: *')).toBeInTheDocument();
    expect(getByLabelText('Password: *')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  test('should disable Register button when the form is invalid', async () => {
    const { getByLabelText, getByText, getAllByLabelText } = render(<Page />);
    const emailInput = getByLabelText('Email: *');
    const passwordInput = getByLabelText('Password: *');
    const firstNameInput = getByLabelText('First Name: *');
    const lastNameInput = getByLabelText('Last Name: *');
    const streetInput = getAllByLabelText('Street: *');
    const cityInput = getAllByLabelText('City: *');
    const postalCodeInput = getAllByLabelText('Postal code: *');
    const countryInput = getAllByLabelText('Country: *');

    const registerButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'email' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    streetInput.forEach((i) => {
      fireEvent.change(i, { target: { value: '' } });
    });
    cityInput.forEach((i) => {
      fireEvent.change(i, { target: { value: '123' } });
    });
    postalCodeInput.forEach((i) => {
      fireEvent.change(i, { target: { value: '1234' } });
    });
    countryInput.forEach((i) => {
      fireEvent.change(i, { target: { value: '' } });
    });

    await waitFor(() => {
      expect(registerButton).toBeDisabled();
    });
  });

  test('should open Register button when the form is valid', async () => {
    const { getByLabelText, getByText, getAllByLabelText } = render(<Page />);
    const emailInput = getByLabelText('Email: *');
    const passwordInput = getByLabelText('Password: *');
    const firstNameInput = getByLabelText('First Name: *');
    const lastNameInput = getByLabelText('Last Name: *');
    const streetInput = getAllByLabelText('Street: *');
    const cityInput = getAllByLabelText('City: *');
    const postalCodeInput = getAllByLabelText('Postal code: *');
    const countryInput = getAllByLabelText('Country: *');

    const registerButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456bB' } });
    fireEvent.change(firstNameInput, { target: { value: 'Elena' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    streetInput.forEach((i) => {
      fireEvent.change(i, { target: { value: 'Baker Street' } });
    });
    cityInput.forEach((i) => {
      fireEvent.change(i, { target: { value: 'London' } });
    });
    postalCodeInput.forEach((i) => {
      fireEvent.change(i, { target: { value: '12345' } });
    });
    countryInput.forEach((i) => {
      fireEvent.change(i, { target: { value: 'BY' } });
    });

    await waitFor(() => {
      expect(registerButton).toBeEnabled();
    });
  });
});
