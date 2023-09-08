import { render } from '@testing-library/react';
import Page from './page';

describe('AboutUs', () => {
  it('should render with correct props', () => {
    const { getByText } = render(<Page />);

    expect(getByText('About US')).toBeInTheDocument();
    expect(getByText('Our collaboration')).toBeInTheDocument();
  });
});
