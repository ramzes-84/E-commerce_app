import { fireEvent, render, screen } from '@testing-library/react';
import { IFormData } from '../../page';
import { Dispatch } from 'react';
import FirstNameValid from './firstNameValid';

describe('FirstNameValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormData>> = jest.fn();

  test('renders correctly', () => {
    const firstName = 'Lena';
    render(<FirstNameValid firstName={firstName} setFormData={setFormData} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(firstName);
  });

  test('updates value on input change', () => {
    const { getByLabelText } = render(<FirstNameValid firstName="" setFormData={setFormData} />);
    const firstNameInput = getByLabelText('First Name:');
    fireEvent.change(firstNameInput, { target: { value: 'Lena' } });
  });

  test('show error message', () => {
    const { getByLabelText, getByText } = render(<FirstNameValid firstName="" setFormData={setFormData} />);
    const firstNameInput = getByLabelText('First Name:');

    fireEvent.change(firstNameInput, { target: { value: '1!' } });
    expect(getByText('Must contain at least one character and no special characters or numbers')).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { getByLabelText, queryByText } = render(<FirstNameValid firstName="" setFormData={setFormData} />);
    const firstNameInput = getByLabelText('First Name:');

    fireEvent.change(firstNameInput, { target: { value: 'Lena' } });
    expect(queryByText('Must contain at least one character and no special characters or numbers')).toBeNull();
  });
});
