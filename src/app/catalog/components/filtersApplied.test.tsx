import { fireEvent, render, screen } from '@testing-library/react';
import FiltersApplied from './filtersApplied';
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

describe('Catalog filters', () => {
  it('renders panel', () => {
    render(<FiltersApplied searchParams={{ color: 'green', priceFrom: 15, priceTo: 40 }} />);

    const color = screen.getByText('Color: green ×');
    const price = screen.getByText('Price range: 15-40USD ×');

    expect(color).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
