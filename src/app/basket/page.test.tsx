import { render, screen } from '@testing-library/react';
import Page from './page';
import { DrawListItems } from './components/DrawListItems';
import CartService from '@/service/api/CartService';

const mockGetActiveCart = jest.fn().mockReturnValue({});
jest.mock('./components/DrawListItems', () => ({ DrawListItems: jest.fn().mockReturnValue('Text') }));
jest.mock('@/service/api/CartService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getActiveCart: mockGetActiveCart,
    };
  });
});

describe('Cart page', () => {
  it('renders header', async () => {
    const Result = await Page();

    render(Result);

    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(DrawListItems).toHaveBeenCalled();
  });
});
