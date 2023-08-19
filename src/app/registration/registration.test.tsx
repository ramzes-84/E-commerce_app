import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';

describe('Registration page', () => {
  it('renders a greeting', () => {
    render(<Page />);

    const greet = screen.getByText('Registration');

    expect(greet).toBeInTheDocument();
  });
});
