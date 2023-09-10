import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonAddToCart } from './ButtonAddToCart';
import { ButtonRemoveFromCart } from './ButtonRemoveFromCart';

describe('Button "Add to cart"', () => {
  it('contains text', () => {
    const { getByText } = render(<ButtonAddToCart productID="someID" />);

    const bttnText = getByText('🛒 Add to cart');

    expect(bttnText).toBeInTheDocument();
  });
  it('contains text', () => {
    const { getByText } = render(<ButtonRemoveFromCart lineItemId="someID" />);

    const bttnText = getByText('❌ Remove');

    expect(bttnText).toBeInTheDocument();
  });
});
