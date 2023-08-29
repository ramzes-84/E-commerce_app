import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

describe('Main page', () => {
  it('renders greeting', () => {
    const { getByText } = render(<Home />);

    const greeting = getByText('Hello, Main page!');
    const loginBttn = getByText('Log in');
    const registerBttn = getByText('Registration');

    expect(greeting).toBeInTheDocument();
    expect(loginBttn).toBeInTheDocument();
    expect(registerBttn).toBeInTheDocument();
  });
});
