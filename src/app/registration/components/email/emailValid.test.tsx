import { fireEvent, render, screen } from '@testing-library/react';
import EmailValid from "./emailValid"
import { IFormData } from '../../page';
import { Dispatch } from 'react';

describe('EmailValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormData>> = jest.fn() 

  test('renders correctly', () => {
    const email = 'example@example.com'
    render(<EmailValid email={email} setFormData={setFormData} />)
    const input: HTMLInputElement = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue(email)
  })

  test('updates value on input change', () => {
    const { getByLabelText } = render(<EmailValid email='' setFormData={setFormData} />)
    const emailInput = getByLabelText('Email:')
    fireEvent.change(emailInput, { target: { value: 'example@test.com' } })
  })

  test('show error message', () => {
    const { getByLabelText, getByText } = render(<EmailValid email='' setFormData={setFormData} />);
    const emailInput = getByLabelText('Email:');

    fireEvent.change(emailInput, { target: { value: 'exampletest.com' } });
    expect(getByText('Enter email in format example@example.ex')).toBeInTheDocument();
  });

  test('does not show error message', () => {
    const { getByLabelText, queryByText } = render(<EmailValid email='' setFormData={setFormData} />);
    const emailInput = getByLabelText('Email:');

    fireEvent.change(emailInput, { target: { value: 'example@test.com' } });
    expect(queryByText('Enter email in format example@example.ex')).toBeNull();
  });
})

