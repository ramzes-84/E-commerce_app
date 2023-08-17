import { render, screen } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

describe('Main page', () => {
  it('renders a greeting', () => {
    render(<Home />);

    const greet = screen.getByText('Hello, Main page!');

    expect(greet).toBeInTheDocument();
  });
});
