import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Page from './page';
import '@testing-library/jest-dom';
import { getUserInfo, logout } from '../account/account-actions';

jest.mock('../account/account-actions', () => ({ getUserInfo: jest.fn().mockReturnValue(Promise.resolve(res)) }));
jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

const res = {
  statusCode: 200,
  body: {
    email: '111@test.com',
    firstName: 'John',
    lastName: 'Doe',
    password: '****IUk=',
    addresses: [],
    shippingAddressIds: [],
    billingAddressIds: [],
  },
};

describe('Account page', () => {
  it('renders a header', () => {
    render(<Page />);

    const startMessage = screen.getByText('Account section');

    expect(startMessage).toBeInTheDocument();
  });
  it('renrer logout button', () => {
    render(<Page />);

    const logoutButton = screen.getByText('Logout');

    expect(logoutButton).toBeInTheDocument();
  });
});
