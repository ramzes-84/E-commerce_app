import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';
import { login } from './login-actions';

jest.mock('../login/login-actions', () => ({ login: jest.fn().mockReturnValue(Promise.resolve('')) }));

describe('Login page', () => {
  it('renders page name', () => {
    render(<Page />);

    const message = screen.getByText('Login section');

    expect(message).toBeInTheDocument();
  });
});
