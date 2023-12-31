import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue(''),
  usePathname: jest.fn().mockReturnValue(''),
  useSearchParams: jest.fn().mockReturnValue({
    color: 'green',
    has(prp: string) {
      return true;
    },
    get(prp: string) {
      return prp;
    },
  }),
}));
import SortForm from './sort';

describe('Catalog sort', () => {
  it('renders panel', () => {
    render(<SortForm />);

    const btn = screen.getByText('Sort');
    fireEvent.click(btn);

    expect(screen.getByLabelText('Name (A-Z)')).toBeInTheDocument();
    expect(screen.getByLabelText('Price (min-max)')).toBeInTheDocument();
  });
});
