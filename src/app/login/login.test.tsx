import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

jest.mock('../login/login-actions', () => ({ login: jest.fn().mockReturnValue(Promise.resolve('')) }));

describe('Login page', () => {
  it('render registration form', () => {
    const { getByText, getByLabelText } = render(<LoginForm />);

    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Reset form')).toBeInTheDocument();
    expect(getByText('Submit form')).toBeInTheDocument();
  });
});
