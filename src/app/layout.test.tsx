import RootLayout from './layout';
import { render } from '@testing-library/react';
import { CustomerService } from '@/service/api';
import { useRouter } from 'next/navigation';
jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

jest.mock('@/service/api');

describe('Root layout', () => {
  it('renders a page with correct layout', () => {
    const Child = () => {
      return <p>Hello, page!</p>;
    };
    const { container } = render(
      <RootLayout>
        <Child />
      </RootLayout>,
      { container: document.documentElement }
    );
    const page = container.firstChild;

    expect(page).toHaveTextContent('Hello, page!');
    expect(page).toHaveTextContent('Catalog');
    expect(page).toHaveTextContent('Register');
  });
});
