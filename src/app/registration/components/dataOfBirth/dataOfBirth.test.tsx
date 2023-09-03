import React, { Dispatch } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DataOfBirthValid from './dataOfBirthValid';

describe('DataOfBirthValid component', () => {
  const setDateOfBirth: Dispatch<React.SetStateAction<string | undefined>> = jest.fn();

  test('renders correctly', () => {
    render(<DataOfBirthValid dateOfBirth="2009-01-01" setDateOfBirth={setDateOfBirth} />);

    const dateOfBirthInput = screen.getByDisplayValue('2009-01-01');

    fireEvent.change(dateOfBirthInput, { target: { value: '1990-01-01' } });
    expect(dateOfBirthInput).toBeInTheDocument();
    expect(dateOfBirthInput).toHaveAttribute('type', 'date');
    expect(setDateOfBirth).toHaveBeenCalledWith('1990-01-01');
  });

  test('renders correctly if value is undefined', () => {
    render(<DataOfBirthValid dateOfBirth={undefined} setDateOfBirth={setDateOfBirth} />);
    const input: HTMLInputElement = screen.getByDisplayValue('');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
});
