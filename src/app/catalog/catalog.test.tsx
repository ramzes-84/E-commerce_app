import { render, screen } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';
import { getCategories } from '../../categories-actions';

jest.mock('../../categories-actions',
 () => ({getCategories: jest.fn().mockReturnValue(Promise.resolve(res))}))

const res = ['Men', 'Women', 'Kids']

describe('Catalog page', () => {
  it('renders a greeting', () => {
    render(<Page />);

    const greet = screen.getByText('Hello, Catalog Page!');

    expect(greet).toBeInTheDocument();
    expect(getCategories).toHaveBeenCalled()
  });
});
