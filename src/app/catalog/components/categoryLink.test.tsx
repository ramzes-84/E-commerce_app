import CategoryLink from './categoryLink';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoryItem } from '../utils/categories';

describe('Category Link', () => {
  it('renders Category link correctly', () => {
    const cat1: CategoryItem = {
      name: 'Suncatchers',
      id: '0001',
      slug: '',
    };

    render(<CategoryLink item={cat1} />);

    const category = screen.getByText('Suncatchers');

    expect(category).toBeInTheDocument();
  });

  it('renders Category link correctly', () => {
    const cat2: CategoryItem = {
      name: 'Glass hangings',
      id: '0001',
      slug: 'hanging',
      children: [
        { name: 'Panels', id: '0002', slug: 'panels' },
        { name: 'Suncatchers', id: '0003', slug: 'suncatchers' },
      ],
    };

    render(<CategoryLink item={cat2} />);

    const category1 = screen.getByText('Suncatchers');
    const category2 = screen.getByText('Panels');
    const category3 = screen.getByText('Glass hangings');

    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
    expect(category3).toBeInTheDocument();
  });
});
