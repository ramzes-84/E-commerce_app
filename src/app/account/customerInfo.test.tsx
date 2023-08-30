import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomerInfo } from './CustomerInfo';

describe('CustomerInfo', () => {
  const mockCustomer = {
    id: '15648jfh',
    email: 'test@test.com',
    password: '123456qQ',
    firstName: 'Elena',
    lastName: 'Bill',
    dateOfBirth: '1990-01-01',
    version: 1,
    addresses: [
      {
        streetName: 'Street',
        city: 'City',
        postalCode: '123456',
        country: 'KZ',
        defaultShippingAddress: true,
      },
      {
        streetName: 'Street 2',
        city: 'City 2',
        postalCode: '67890',
        country: 'ES',
        defaultShippingAddress: false,
      },
    ],
  };
  it('display if have Customer', () => {
    render(<CustomerInfo customer={mockCustomer} />);

    const firstNameField = screen.getByText('Name:');
    const lastNameField = screen.getByText('Lastname:');
    const dateOfBirthField = screen.getByText('Birthday:');
    const loginInfo = screen.getByText('Login & Security');
    const emailField = screen.getByText('Email:');
    const passwordField = screen.getByText('Password:');
    const blockPersonalInfo = screen.getByText('Personal information');
    const blockShippingAddress = screen.getByText('Shipping address');
    const blockBillingAddress = screen.getByText('Billing address');
    const streetField = screen.getAllByText('Street:');
    const cityField = screen.getAllByText('City:');
    const countryField = screen.getAllByText('Country:');
    const postalCodeField = screen.getAllByText('Postal code:');

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(dateOfBirthField).toBeInTheDocument();
    expect(loginInfo).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(blockPersonalInfo).toBeInTheDocument();
    expect(blockShippingAddress).toBeInTheDocument();
    expect(blockBillingAddress).toBeInTheDocument();
    streetField.forEach((i) => {
      expect(i).toBeInTheDocument();
    });
    countryField.forEach((i) => {
      expect(i).toBeInTheDocument();
    });
    cityField.forEach((i) => {
      expect(i).toBeInTheDocument();
    });
    postalCodeField.forEach((i) => {
      expect(i).toBeInTheDocument();
    });
  });
});
