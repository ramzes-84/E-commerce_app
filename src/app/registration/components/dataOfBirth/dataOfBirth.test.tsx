import React, { Dispatch } from 'react';
import { screen } from '@testing-library/react';

describe('DataOfBirthValid component', () => {
  const setDateOfBirth: Dispatch<React.SetStateAction<string | undefined>> = jest.fn();

  test('renders correctly', () => {
    document.body.innerHTML = '<input data-testid="Label" type="date" name="dateOfBirth"/>';

    const dateOfBirthInput = screen.getByTestId('Label');
    expect(dateOfBirthInput).toBeInTheDocument();
    expect(dateOfBirthInput).toHaveAttribute('type', 'date');
  });
});
