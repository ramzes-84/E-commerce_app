import React, { Dispatch } from 'react';
import { render, fireEvent } from '@testing-library/react';
import PostalCode from './postalCode';
import { IAddress } from '../../page';

describe('PostalCode component', () => {
  const setFormData: Dispatch<React.SetStateAction<IAddress>> = jest.fn();

  test('renders correctly', () => {
    const { getByLabelText } = render(<PostalCode country="US" postalCode="" setFormData={setFormData} />);
    const postalCodeInput = getByLabelText('Postal code:*');
    expect(postalCodeInput).toBeInTheDocument();
    expect(postalCodeInput).toHaveAttribute('type', 'text');
  });

  test('updates value on input change', () => {
    const { getByLabelText } = render(<PostalCode country="US" postalCode="" setFormData={setFormData} />);
    const postalCodeInput = getByLabelText('Postal code:*');
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
  });

  test('show error message', () => {
    const { getByLabelText, getByText } = render(<PostalCode country="US" postalCode="" setFormData={setFormData} />);
    const postalCodeInput = getByLabelText('Postal code:*');

    fireEvent.change(postalCodeInput, { target: { value: '1234' } });
    expect(
      getByText('Enter the postal code in the format of your country without spaces, commas and dashes')
    ).toBeInTheDocument();
  });

  test('show error message', () => {
    const { getByLabelText, getByText } = render(<PostalCode country="BY" postalCode="" setFormData={setFormData} />);
    const postalCodeInput = getByLabelText('Postal code:*');

    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
    expect(
      getByText('Enter the postal code in the format of your country without spaces, commas and dashes')
    ).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { getByLabelText, queryByText } = render(<PostalCode country="US" postalCode="" setFormData={setFormData} />);
    const postalCodeInput = getByLabelText('Postal code:*');

    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
    expect(
      queryByText('Enter the postal code in the format of your country without spaces, commas and dashes')
    ).toBeNull();
  });
});
