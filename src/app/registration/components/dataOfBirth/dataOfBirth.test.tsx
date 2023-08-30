import React, { Dispatch } from 'react';
import { render, screen } from '@testing-library/react';
import DataOfBirthValid from './dataOfBirthValid';

describe('DataOfBirthValid component', () => {
  const setDateOfBirth: Dispatch<React.SetStateAction<string | undefined>> = jest.fn();

  test('renders correctly', () => {
    document.body.innerHTML = '<input data-testid="Label" type="date" name="dateOfBirth"/>';

    const dateOfBirthInput = screen.getByTestId('Label');
    expect(dateOfBirthInput).toBeInTheDocument();
    expect(dateOfBirthInput).toHaveAttribute('type', 'date');
  });
});
