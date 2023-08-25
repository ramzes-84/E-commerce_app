import { fireEvent, render, screen } from '@testing-library/react';
import { IFormData } from '../../page';
import { Dispatch } from 'react';
import LastNameValid from './lastNameValid';

describe('LastNameValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormData>> = jest.fn();

  test('renders correctly', () => {
    const lastName = 'Doe';
    render(<LastNameValid lastName={lastName} setFormData={setFormData} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(lastName);
  });

  test('updates value on input change', () => {
    render(<LastNameValid lastName="" setFormData={setFormData} />);
    const lastNameInput: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  });

  test('show error message', () => {
    const { getByText } = render(<LastNameValid lastName="" setFormData={setFormData} />);
    const lastNameInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(lastNameInput, { target: { value: '1' } });
    expect(getByText('Must contain at least one character and no special characters or numbers')).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { queryByText } = render(<LastNameValid lastName="" setFormData={setFormData} />);
    const lastNameInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(queryByText('Must contain at least one character and no special characters or numbers')).toBeNull();
  });
});
