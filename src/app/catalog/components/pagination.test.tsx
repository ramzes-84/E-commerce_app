import { ProductCard } from '@/service/api/CatalogService';
import Pagination from './pagination';
import { render, screen } from '@testing-library/react';
import getPageProducts from '../utils/pageProducts';

import { useSearchParams } from 'next/navigation';
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue({
    color: 'green',
  }),
}));
jest.mock('../utils/pageProducts');

const products: ProductCard[] = [
  {
    name: 'Fern frame',
    ID: '1',
    key: '1',
  },
  {
    name: 'Lotus',
    ID: '2',
    key: '2',
  },
];

describe('Show pagination page ', () => {
  it('highlight search res', () => {
    render(<Pagination filters={{}} sort="" productsArr={products} />);

    const fern = screen.getByText('Fern frame');

    expect(fern).toBeInTheDocument();
  });
});
