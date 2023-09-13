import { render } from '@testing-library/react';
import ClearCart from './clearCart';

describe('Clear cart component', () => {
  it('renders btn', () => {
    const { getByText } = render(<ClearCart cartId="" cartVersion={1} />);
    const btn = getByText('Clear cart');
    expect(btn).toBeInTheDocument();
  });
});
