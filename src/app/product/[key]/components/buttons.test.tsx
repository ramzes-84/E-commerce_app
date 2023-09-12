import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonAddToCart } from './ButtonAddToCart';
import { ButtonRemoveFromCart } from './ButtonRemoveFromCart';
import { ButtonDeleteCart } from './ButtonDeleteCart';

describe('Button "Add to cart"', () => {
  it('contains text', () => {
    const { getByText } = render(<ButtonAddToCart productID="someID" />);

    const bttnText = getByText('🛒 Add to cart');

    expect(bttnText).toBeInTheDocument();
  });
});

describe('Button "Remove from cart"', () => {
  it('contains text', () => {
    const { getByText } = render(<ButtonRemoveFromCart lineItemId="someID" />);

    const bttnText = getByText('❌ Remove');

    expect(bttnText).toBeInTheDocument();
  });
});

describe('Button "Delete cart"', () => {
  it('contains text', () => {
    const { getByText } = render(<ButtonDeleteCart cartID="someID" cartVersion={4} />);

    const bttnText = getByText('❌ Delete cart');

    expect(bttnText).toBeInTheDocument();
  });
});
