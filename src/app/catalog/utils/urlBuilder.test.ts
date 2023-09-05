import urlBuilder from './urlBuilder';

describe('Url build from params', () => {
  it('return correct data', () => {
    const url = urlBuilder({ basePath: '/catalog', pricePath: 'priceFrom=30&priceTo=40', sortPath: 'sortby=nameDESC' });
    const url2 = urlBuilder({ basePath: '/catalog', colorPath: 'color=green' });
    const url3 = urlBuilder({ basePath: '/catalog/mirrors' });
    const url4 = urlBuilder({
      basePath: '/catalog',
      pricePath: 'priceFrom=20&priceTo=50',
      colorPath: 'color=red',
      sortPath: 'sortby=nameDESC',
    });

    expect(url).toBe('/catalog?priceFrom=30&priceTo=40&sortby=nameDESC');
    expect(url2).toBe('/catalog?color=green');
    expect(url3).toBe('/catalog/mirrors');
    expect(url4).toBe('/catalog?color=red&priceFrom=20&priceTo=50&sortby=nameDESC');
  });
});
