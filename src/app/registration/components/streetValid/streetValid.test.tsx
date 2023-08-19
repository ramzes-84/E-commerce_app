import React, { Dispatch } from 'react';
import { render, fireEvent } from '@testing-library/react';
import StreetValid from './streetValid';
import { IFormData } from '../../page';

describe('StreetValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormData>> = jest.fn();

  test('renders correctly', () => {
    const { getByLabelText } = render(<StreetValid streetName="" setFormData={setFormData} />);
    const streetInput = getByLabelText('Street:');
    expect(streetInput).toBeInTheDocument();
    expect(streetInput).toHaveValue('');
  });

  test('updates street value on input change', () => {
    const { getByLabelText } = render(<StreetValid streetName="" setFormData={setFormData} />);
    const streetInput = getByLabelText('Street:');
    fireEvent.change(streetInput, { target: { value: 'Baker Street' } });
  });

  test('show error message', () => {
    const { getByLabelText, queryByText } = render(<StreetValid streetName="" setFormData={setFormData} />);
    const streetInput = getByLabelText('Street:');

    fireEvent.change(streetInput, { target: { value: '1!' } });
    expect(queryByText('Must contain at least one character')).toBeNull();
  });

  test('does not show error message', () => {
    const { getByLabelText, queryByText } = render(<StreetValid streetName="" setFormData={setFormData} />);
    const streetInput = getByLabelText('Street:');

    fireEvent.change(streetInput, { target: { value: 'Baker Street' } });
    expect(queryByText('Must contain at least one character')).toBeNull();
  });
});
