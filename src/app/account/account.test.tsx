import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';
import { LogoutButton } from './LogoutButton';

jest.mock('@/service/api');

jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

describe('Account page', () => {
  it('renders a header', () => {
    render(<Page />);

    const startMessage = screen.getByText('Account section');

    expect(startMessage).toBeInTheDocument();
  });

  it('renders a logout button', () => {
    render(<LogoutButton />);

    const logoutBttn = screen.getByText('Logout');

    expect(logoutBttn).toBeInTheDocument();
  });
});
