import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatalogNavPanel from './navPanel';
import { useRouter, usePathname } from 'next/navigation';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue(''),
  usePathname: jest.fn().mockReturnValue(''),
}));

const category: Category = {
  id: '85db2e2f-b2bf-491f-a87a-48e446c6a73c',
  version: 2,
  createdAt: '2023-08-06T15:46:03.275Z',
  lastModifiedAt: '2023-08-21T20:41:12.018Z',
  lastModifiedBy: {},
  createdBy: {},
  key: 'panels',
  name: { 'en-US': 'Panels', ru: 'Панно' },
  slug: { 'en-US': 'panels', ru: 'panels' },
  description: { 'en-US': 'Stained glass panels', ru: 'Витражные панно' },
  ancestors: [],
  parent: {
    typeId: 'category',
    id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
    obj: {
      id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
      version: 1,
      createdAt: '2023-08-06T15:43:53.322Z',
      lastModifiedAt: '2023-08-06T15:43:53.322Z',
      lastModifiedBy: {},
      createdBy: {},
      key: 'hangings',
      name: { 'en-US': 'Glass hangings', ru: 'Подвески и панно' },
      slug: { 'en-US': 'hangings', ru: 'hangings' },
      description: {
        'en-US': 'Stained glass wall and window hangings',
        ru: 'Витражные панно и подвески',
      },
      ancestors: [],
      orderHint: '0.1',
      metaTitle: { 'en-US': 'Glass hangings', ru: 'Подвески и панно' },
      metaDescription: {
        'en-US': 'Stained glass wall and window hangings',
        ru: 'Витражные панно и подвески',
      },
      assets: [],
    },
  },
  orderHint: '0.2',
  metaTitle: { 'en-US': 'Panels', ru: 'Панно' },
  metaDescription: { 'en-US': 'Stained glass panels', ru: 'Витражные панно' },
  assets: [],
};

const products: ProductProjection[] = [
  {
    id: 'd722a425-aef3-4eee-bce3-0e3829053ea8',
    version: 1,
    productType: {
      typeId: 'product-type',
      id: '1dabd020-5a64-4d5a-9706-9ee5dfeccaab',
    },
    name: {
      'en-US': 'Honeycomb wall hanging',
      ru: 'Панно медовое',
    },
    categories: [
      {
        typeId: 'category',
        id: '85db2e2f-b2bf-491f-a87a-48e446c6a73c',
      },
    ],
    categoryOrderHints: {},
    slug: {
      'en-US': 'honeycomb',
      ru: 'honeycomb',
    },
    metaTitle: {
      'en-US': 'honeycomb',
    },
    metaKeywords: {
      'en-US': 'honeycomb',
    },
    metaDescription: {
      'en-US': 'Honeycomb wall hanging made of yellow and orange glass',
      ru: 'Панно из стекла в желтых оттенках в форме сот',
    },
    masterVariant: {
      id: 1,
      sku: 'U0005',
      key: 'U0005',
      prices: [
        {
          id: '36a786e9-581e-47e2-9232-0aaef27c331f',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 3300,
            fractionDigits: 2,
          },
        },
      ],
      images: [
        {
          url: 'https://static.tildacdn.com/stor3065-3634-4633-b330-643930373864/80820334.jpg ',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
        {
          url: ' https://static.tildacdn.com/stor6536-6538-4766-b233-613230313666/92812729.jpg ',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
        {
          url: ' https://static.tildacdn.com/stor6163-6665-4263-b564-386634626630/74378147.jpg',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
      ],
      attributes: [
        {
          name: 'glass-color',
          value: 'yellow',
        },
        {
          name: 'measures',
          value: '21x18cm',
        },
        {
          name: 'materials',
          value: 'glass, tin solder, copper foil, herbarium',
        },
      ],
      assets: [],
    },
    variants: [],
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    taxCategory: {
      typeId: 'tax-category',
      id: '98d43b79-0578-4952-a93b-c22231a6751c',
    },
    createdAt: '2023-08-25T17:14:14.232Z',
    lastModifiedAt: '2023-08-25T17:14:14.232Z',
  },
];

describe('Catalog panel with breadcrumbs and filters', () => {
  it('renders correct nav', () => {
    render(<CatalogNavPanel category={category} products={products} />);

    const link1 = screen.getByText('Panels');
    const btn = screen.getByText('Filters');
    fireEvent.click(btn);

    expect(screen.getByLabelText('Price from:')).toBeInTheDocument();
    expect(screen.getByText('yellow')).toBeInTheDocument();
    expect(link1).toBeInTheDocument();
  });
});
