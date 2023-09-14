import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import CatalogService from '@/service/api/CatalogService';
import { products } from '../../components/filters.test';
import { cardsInfo } from '../../utils/cards';
import FiltersApplied from '../../components/filtersApplied';
import FiltersForm from '../../components/filters';
import SortForm from '../../components/sort';
import SearchHighlight from '../../components/searchHighlight';
import CartService from '@/service/api/CartService';
import { lineItems } from '@/app/basket/components/drawListItems.test';

const mockGetAllProductsBySearch = jest.fn().mockReturnValue(products);
const mockGetDiscoutedProducts = jest.fn().mockReturnValue(products);
jest.mock('@/service/api/CatalogService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllProductsBySearch: mockGetAllProductsBySearch,
      getDiscoutedProducts: mockGetDiscoutedProducts,
    };
  });
});

const mockGetActiveCart = jest.fn().mockReturnValue(lineItems.lineItems);
jest.mock('@/service/api/CartService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getActiveCart: mockGetActiveCart,
    };
  });
});
jest.mock('../../utils/cards', () => ({ cardsInfo: jest.fn().mockReturnValue('') }));

describe('Search page', () => {
  it('should call CatalogService class & it`s method', async () => {
    await Page({ params: { res: 'string' }, searchParams: { color: 'value' } });

    expect(CatalogService).toHaveBeenCalled();
    expect(mockGetAllProductsBySearch).toHaveBeenCalled();
    expect(mockGetDiscoutedProducts).toHaveBeenCalled();
  });
  it('should call CartService class & it`s method', async () => {
    await Page({ params: { res: 'string' }, searchParams: { color: 'value' } });

    expect(CartService).toHaveBeenCalled();
    expect(mockGetActiveCart).toHaveBeenCalled();
  });
});
