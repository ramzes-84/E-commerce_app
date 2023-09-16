import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import StreetValid from './streetValid';

describe('StreetValid component', () => {
  test('renders correctly', () => {
    render(<StreetValid streetName="" onUpdate={() => {}} />);
    const streetInput: HTMLInputElement = screen.getByRole('textbox');
    expect(streetInput).toBeInTheDocument();
    expect(streetInput).toHaveValue('');
  });

  test('renders correctly if value is undefined', () => {
    render(<StreetValid streetName={undefined} onUpdate={() => {}} />);
    const streetInput: HTMLInputElement = screen.getByRole('textbox');
    expect(streetInput).toBeInTheDocument();
    expect(streetInput).toHaveValue('');
  });

  test('updates street value on input change', () => {
    render(<StreetValid streetName="" onUpdate={() => {}} />);
    const streetInput: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(streetInput, { target: { value: 'Baker Street' } });
  });

  test('show error message', () => {
    const { queryByText } = render(<StreetValid streetName="" onUpdate={() => {}} />);
    const streetInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(streetInput, { target: { value: '1!' } });
    expect(queryByText('Must contain at least one character')).toBeNull();
  });

  test('does not show error message', () => {
    const { queryByText } = render(<StreetValid streetName="" onUpdate={() => {}} />);
    const streetInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(streetInput, { target: { value: 'Baker Street' } });
    expect(queryByText('Must contain at least one character')).toBeNull();
  });
});
