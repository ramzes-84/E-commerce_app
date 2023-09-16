import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductNavBar } from './ProductNavBar';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

describe('ProductNavBar', () => {
  it('should render Back button', () => {
    const { getByText } = render(<ProductNavBar />);
    const backButton = getByText('To previous page');
    expect(backButton).toBeInTheDocument();
  });
});
