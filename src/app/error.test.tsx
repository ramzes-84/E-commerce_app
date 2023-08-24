import { fireEvent, render, screen } from '@testing-library/react';
import ErrorPage from './error';
import '@testing-library/jest-dom';

describe('Error page', () => {
  it('renders a correct Error page', () => {
    render(<ErrorPage error={new Error()} reset={() => {}} />);

    const btn = screen.getByText('Try again');
    fireEvent.click(btn);

    expect(btn).toBeInTheDocument();
  });
});
