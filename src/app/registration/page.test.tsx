import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Page from './page';
import CheckboxAddress from './elements/checkbox/checkbox';
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

  test('have checkbox whom calls onChange function when clicked', () => {
    const mockOnChange = jest.fn();
    const { getByRole } = render(
      <CheckboxAddress label="Use for Billing address" checked={false} onChange={mockOnChange} />
    );
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('have checkbox whom updates isChecked state when clicked', () => {
    const mockOnChange = jest.fn();
    const { getByRole } = render(
      <CheckboxAddress label="Use for Billing address" checked={true} onChange={mockOnChange} />
    );
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
