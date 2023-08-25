import React, { Dispatch } from 'react';
import { screen } from '@testing-library/react';
import { IFormData } from '../../page';

describe('DataOfBirthValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormData>> = jest.fn();

  test('renders correctly', () => {
    document.body.innerHTML = '<input data-testid="Label" type="date" name="dateOfBirth"/>'
    
    const dateOfBirthInput = screen.getByTestId('Label');
    expect(dateOfBirthInput).toBeInTheDocument();
    expect(dateOfBirthInput).toHaveAttribute('type', 'date');
  });
});
