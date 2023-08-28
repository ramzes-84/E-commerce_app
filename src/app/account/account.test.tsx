import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';

jest.mock('@/service/api');

jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

describe('Account page', () => {
  it('renders a header', () => {
    render(<Page />);

    const startMessage = screen.getByText('Account section');

    expect(startMessage).toBeInTheDocument();
  });
});
