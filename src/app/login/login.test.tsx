import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';

describe('Login page', () => {
  it('renders a greeting', () => {
    render(<Page />);

    const greet = screen.getByText('Hello, Login Page!');

    expect(greet).toBeInTheDocument();
  });
});
