import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Page from './page';
import { registerUser } from '@/service/api/client';

describe('Page component', () => {
  test('should render registration form', () => {
    const { getByText, getByLabelText } = render(<Page />);
    expect(getByText('Registration')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  test('should disable Register button when the form is invalid', async () => {
    const { getByLabelText, getByText } = render(<Page />);
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const firstNameInput = getByLabelText('First Name:');
    const lastNameInput = getByLabelText('Last Name:');
    const streetInput = getByLabelText('Street:');
    const cityInput = getByLabelText('City:');
    const postalCodeInput = getByLabelText('Postal code:');
    const countryInput = getByLabelText('Country:');

    const registerButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'email' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.change(streetInput, { target: { value: '' } });
    fireEvent.change(cityInput, { target: { value: '123' } });
    fireEvent.change(postalCodeInput, { target: { value: '1234' } });
    fireEvent.change(countryInput, { target: { value: '' } });

    await waitFor(() => {
      expect(registerButton).toBeDisabled();
    });
  });

  test('should open Register button when the form is valid', async () => {
    const { getByLabelText, getByText } = render(<Page />);
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const firstNameInput = getByLabelText('First Name:');
    const lastNameInput = getByLabelText('Last Name:');
    const streetInput = getByLabelText('Street:');
    const cityInput = getByLabelText('City:');
    const postalCodeInput = getByLabelText('Postal code:');
    const countryInput = getByLabelText('Country:');

    const registerButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456bB' } });
    fireEvent.change(firstNameInput, { target: { value: 'Elena' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(streetInput, { target: { value: 'Baker Street' } });
    fireEvent.change(cityInput, { target: { value: 'London' } });
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
    fireEvent.change(countryInput, { target: { value: 'BY' } });

    await waitFor(() => {
      expect(registerButton).toBeEnabled();
    });
  });
});
