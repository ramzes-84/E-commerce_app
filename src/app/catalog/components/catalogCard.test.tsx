import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatalogCard from './catalogCard';
import { ProductCard } from '@/service/api/CatalogService';

const pr: ProductCard = {
  name: 'Clover suncatcher',
  mainImage: 'https://thumb.tildacdn.com/stor3132-3434-4061-b262-373130363730/-/format/webp/44175482.jpg',
  price: 1700,
  ID: 'someID',
};

describe('Catalog card', () => {
  it('renders card', () => {
    render(<CatalogCard product={pr} />);

    const productName = screen.getByText('Clover suncatcher');
    const productPrice = screen.getByText('17 USD');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });
});
