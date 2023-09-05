import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { CustomerInfo } from './CustomerInfo';
import { expectedData } from './account-action.test';

jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

describe('CustomerInfo', () => {
  afterEach(cleanup);
  it('display if have Customer', () => {
    render(<CustomerInfo customer={expectedData} />);

    const firstNameField = screen.getByText('Name:');
    const lastNameField = screen.getByText('Lastname:');
    const dateOfBirthField = screen.getByText('Birthday:');
    const loginInfo = screen.getByText('Login & Security');
    const emailField = screen.getByText('Email:');
    const passwordField = screen.getByText('Password:');
    const blockPersonalInfo = screen.getByText('Personal information');
    const blockShippingAddress = screen.getByText('Shipping address');
    const blockBillingAddress = screen.getByText('Billing address');

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(dateOfBirthField).toBeInTheDocument();
    expect(loginInfo).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(blockPersonalInfo).toBeInTheDocument();
    expect(blockShippingAddress).toBeInTheDocument();
    expect(blockBillingAddress).toBeInTheDocument();
  });
});
