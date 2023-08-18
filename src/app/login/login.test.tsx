import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';
import { login } from '../login/login-actions';

jest.mock('../login/login-actions', () => ({ login: jest.fn().mockReturnValue(Promise.resolve('')) }));

describe('Login page', () => {
  it('renders a email input', () => {
    render(<Page />);

    const email = screen.getByText('E-mail:');
    const password = screen.getByText('Password:');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});
