import { fireEvent, render, screen } from '@testing-library/react';
import { Dispatch } from 'react';
import CityValid from './cityValid';
import { IMyAddress } from '@/service/api/CustomerService';

describe('CityValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IMyAddress>> = jest.fn();

  test('renders correctly', () => {
    const city = 'Example';
    render(<CityValid city={city} setFormData={setFormData} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(city);
  });

  test('renders correctly if value is undefined', () => {
    render(<CityValid city={undefined} setFormData={setFormData} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('updates value on input change', () => {
    render(<CityValid city="" setFormData={setFormData} />);
    const cityInput = screen.getByRole('textbox');
    fireEvent.change(cityInput, { target: { value: 'London' } });
  });

  test('show error message', () => {
    const { getByText } = render(<CityValid city="" setFormData={setFormData} />);
    const cityInput = screen.getByRole('textbox');

    fireEvent.change(cityInput, { target: { value: '1!' } });
    expect(getByText('Must contain at least one character and no special characters or numbers')).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { queryByText } = render(<CityValid city="" setFormData={setFormData} />);
    const cityInput = screen.getByRole('textbox');

    fireEvent.change(cityInput, { target: { value: 'London' } });
    expect(queryByText('Must contain at least one character and no special characters or numbers')).toBeNull();
  });
});
