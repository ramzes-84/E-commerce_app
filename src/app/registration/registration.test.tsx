import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

describe('Registration page', () => {
  it('renders a greeting', () => {
    render(<Page />);

    const greet = screen.getByText('Registration');

    expect(greet).toBeInTheDocument();
  });
});
