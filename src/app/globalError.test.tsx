import GlobalError from './global-error';
import { render } from '@testing-library/react';

describe('Global Error', () => {
  it('renders a global error page with correct layout', () => {
    const { container } = render(<GlobalError error={new Error()} reset={() => {}} />, {
      container: document.documentElement,
    });
    const page = container.firstChild;

    expect(page).toHaveTextContent('Something went wrong!Try again');
  });
});
