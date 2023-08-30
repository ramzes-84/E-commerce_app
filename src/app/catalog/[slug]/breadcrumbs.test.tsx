import { Category } from "@commercetools/platform-sdk";
import Breadcrumbs from "./breadcrumbs";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const category:Category = {
  id: '85db2e2f-b2bf-491f-a87a-48e446c6a73c',
  version: 2,
  createdAt: '2023-08-06T15:46:03.275Z',
  lastModifiedAt: '2023-08-21T20:41:12.018Z',
  lastModifiedBy: { },
  createdBy: { },
  key: 'panels',
  name: { 'en-US': 'Panels', ru: 'Панно' },
  slug: { 'en-US': 'panels', ru: 'panels' },
  description: { 'en-US': 'Stained glass panels', ru: 'Витражные панно' },        
  ancestors: [ ],
  parent: {
    typeId: 'category',
    id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
    obj: {
      id: '374fce14-4ad0-4fa7-a0a4-1517d0c5268a',
      version: 1,
      createdAt: '2023-08-06T15:43:53.322Z',
      lastModifiedAt: '2023-08-06T15:43:53.322Z',
      lastModifiedBy: { },
      createdBy: {  },
      key: 'hangings',
      name: { 'en-US': 'Glass hangings', ru: 'Подвески и панно' },
      slug: { 'en-US': 'hangings', ru: 'hangings' },
      description: {
        'en-US': 'Stained glass wall and window hangings',
        ru: 'Витражные панно и подвески'
      },
      ancestors: [],
      orderHint: '0.1',
      metaTitle: { 'en-US': 'Glass hangings', ru: 'Подвески и панно' },
      metaDescription: {
        'en-US': 'Stained glass wall and window hangings',
        ru: 'Витражные панно и подвески'
      },
      assets: []
    }
  },
  orderHint: '0.2',
  metaTitle: { 'en-US': 'Panels', ru: 'Панно' },
  metaDescription: { 'en-US': 'Stained glass panels', ru: 'Витражные панно' },    
  assets: []
}

describe('Breadcrumbs', () => {
  it('renders correct nav', () => {
    render(<Breadcrumbs cat={category} />);

    const link1 = screen.getByText('Panels');
    const link2 = screen.getByText('Glass hangings');

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
  });
});
