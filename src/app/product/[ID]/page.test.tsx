import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page, { DrawAttributes } from './page';

// jest.mock('../login/login-actions', () => ({ login: jest.fn().mockReturnValue(Promise.resolve('')) }));

describe('Product page', () => {
  it('renders attributes', () => {
    const { getByText } = render(
      <DrawAttributes
        attrArr={[
          { name: 'name1', value: 'value1' },
          { name: 'name2', value: 'value2' },
        ]}
      />
    );

    const attrName = getByText('name2');
    const attrValue = getByText('value2', { exact: false });

    expect(attrName).toBeInTheDocument();
    expect(attrValue).toBeInTheDocument();
  });
});
