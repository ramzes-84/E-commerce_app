import { fireEvent, render, screen } from '@testing-library/react';
import { IFormData } from '../../page';
import { Dispatch } from 'react';
import CityValid from './cityValid';

describe('CityValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormData>> = jest.fn();

  test('renders correctly', () => {
    const city = 'Example';
    render(<CityValid city={city} setFormData={setFormData} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(city);
  });

  test('updates value on input change', () => {
    const { getByLabelText } = render(<CityValid city="" setFormData={setFormData} />);
    const cityInput = getByLabelText('City:');
    fireEvent.change(cityInput, { target: { value: 'London' } });
  });

  test('show error message', () => {
    const { getByLabelText, getByText } = render(<CityValid city="" setFormData={setFormData} />);
    const cityInput = getByLabelText('City:');

    fireEvent.change(cityInput, { target: { value: '1!' } });
    expect(getByText('Must contain at least one character and no special characters or numbers')).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { getByLabelText, queryByText } = render(<CityValid city="" setFormData={setFormData} />);
    const cityInput = getByLabelText('City:');

    fireEvent.change(cityInput, { target: { value: 'London' } });
    expect(queryByText('Must contain at least one character and no special characters or numbers')).toBeNull();
  });
});
