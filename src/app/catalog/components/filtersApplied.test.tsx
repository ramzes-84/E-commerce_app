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
      prp === 'sortby';
      return 'nameASC';
    },
  }),
}));

describe('Catalog filters', () => {
  it('renders panel', () => {
    render(<FiltersApplied searchParams={{ color: 'green', priceFrom: 15, priceTo: 40 }} />);

    const color = screen.getByText('Color: green ×');
    const price = screen.getByText('Price range: 15-40USD ×');
    const sort = screen.getByText('Sort: nameASC ×');

    expect(color).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(sort).toBeInTheDocument();
  });

  it('renders panel', () => {
    render(<FiltersApplied searchParams={{ color: 'red' }} />);

    const color = screen.getByText('Color: red ×');
    const sort = screen.getByText('Sort: nameASC ×');

    expect(color).toBeInTheDocument();
    expect(sort).toBeInTheDocument();
  });
  it('renders panel', () => {
    render(<FiltersApplied searchParams={{ priceFrom: 20, priceTo: 30 }} />);

    const price = screen.getByText('Price range: 20-30USD ×');
    const sort = screen.getByText('Sort: nameASC ×');

    expect(price).toBeInTheDocument();
    expect(sort).toBeInTheDocument();
  });
});
