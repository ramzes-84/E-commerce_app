import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonCart } from './ButtonCart';

describe('Button "Add to cart"', () => {
  it('contains text', () => {
    const { getByText } = render(<ButtonCart />);

    const bttnText = getByText('🛒 Add to cart');

    expect(bttnText).toBeInTheDocument();
  });
});
