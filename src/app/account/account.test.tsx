import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';
import { getUserInfo, logout } from '../account/account-actions';

jest.mock('../account/account-actions',
 () => ({getUserInfo: jest.fn().mockReturnValue(Promise.resolve(res))}))

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
  }
 }


describe('Account page', () => {
  it('renders a greeting', () => {
    render(<Page />);

    const startMessage = screen.getByText('Loading data, please wait...');

    expect(startMessage).toBeInTheDocument();
    expect(getUserInfo).toHaveBeenCalled()
  });
});
