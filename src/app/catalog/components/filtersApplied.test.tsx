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
      if (prp === 'sortby') return 'nameASC';
      else if (prp === 'priceFrom') return 15;
      else if (prp === 'priceTo') return 40;
      if (prp === 'color') return 'green'
    },
  }),
}));

describe('Catalog filters', () => {
  it('renders panel', () => {
    render(<FiltersApplied />);

    const color = screen.getByText('Color: green ×');
    const price = screen.getByText('Price range: 15-40USD ×');
    const sort = screen.getByText('Sort: nameASC ×');

    expect(color).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(sort).toBeInTheDocument();
  });
});
