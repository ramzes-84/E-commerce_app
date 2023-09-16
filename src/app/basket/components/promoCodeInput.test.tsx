import { render } from '@testing-library/react';
import Promocode from './promoCodeInput';

jest.mock('../../../service/api/CartService.ts');

describe('Promocode component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', async () => {
    const { getByText } = render(<Promocode cartID="12345" cartVersion={1} />);
    const promocodeTitle = getByText('Enter promocode');
    const applyButton = getByText('Apply');
    const removeButton = getByText('Remove Promocodes');
    expect(promocodeTitle).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });
});
