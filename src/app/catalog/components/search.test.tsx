import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SearchForm from './search';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue(''),
}));

describe('Search form', () => {
  it('renders panel', () => {
    render(<SearchForm />);

    const btn = screen.getByText('Search');

    expect(btn).toBeInTheDocument();
  });
});
