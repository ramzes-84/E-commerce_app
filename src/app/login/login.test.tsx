import { render, screen } from '@testing-library/react';
import Page, { LoginForm } from './page';
import '@testing-library/jest-dom';
import { login } from './login-actions';

jest.mock('../login/login-actions', () => ({ login: jest.fn().mockReturnValue(Promise.resolve('')) }));

describe('Login page', () => {
  it('renders page name', () => {
    render(<Page />);

    const greet = screen.getByText('Hello, User!');

    expect(greet).toBeInTheDocument();
  });

  it('render registration form', () => {
    const { getByText, getByLabelText } = render(<LoginForm />);

    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Reset form')).toBeInTheDocument();
    expect(getByText('Submit form')).toBeInTheDocument();
  });
});
