import { Category } from '@commercetools/platform-sdk';
import { categoriesList } from './search';

const catList: Category[] = [
  {
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
  {
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
  },
  {
    id: 'b5d781c1-0a09-478f-9656-0bf5f129911d',
    version: 2,
    createdAt: '2023-08-06T15:48:21.274Z',
    lastModifiedAt: '2023-08-28T19:50:06.980Z',

    key: 'suncatchers',
    name: { 'en-US': 'Suncatchers', ru: 'Ловцы света' },
    slug: { 'en-US': 'suncatchers', ru: 'suncatchers' },
    description: { 'en-US': 'Stained glass window hangings', ru: 'Ловцы света' },
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
    orderHint: '0.15',
    metaTitle: { 'en-US': 'Suncatchers', ru: 'Ловцы света' },
    metaDescription: { 'en-US': 'Stained glass window hangings', ru: 'Ловцы света' },
    assets: [],
  },
];

describe('Categories array', () => {
  it('return correct data', () => {
    const cards = categoriesList(catList);

    expect(cards[0].name).toBe('Glass hangings');
    expect(cards[0].children?.length).toBe(2);
  });
});
