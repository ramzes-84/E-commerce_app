import React, { Dispatch } from 'react'
import { render, fireEvent } from '@testing-library/react'
import DataOfBirthValid from './dataOfBirthValid'
import { IFormData } from '../../page'

describe('DataOfBirthValid component', () => {
  const setFormData: Dispatch<React.SetStateAction<IFormData>> = jest.fn()

  test('renders correctly', () => {
    const { getByLabelText } = render(<DataOfBirthValid dateOfBirth="" setFormData={setFormData} />)
    const dateOfBirthInput = getByLabelText('Date of birth:')
    expect(dateOfBirthInput).toBeInTheDocument()
    expect(dateOfBirthInput).toHaveAttribute('type', 'date')
  })

  test('does not allow selecting date for someone under 14 years old', () => {
    const { getByLabelText } = render(<DataOfBirthValid dateOfBirth="" setFormData={setFormData} />)
    const dateOfBirthInput = getByLabelText('Date of birth:')
    fireEvent.change(dateOfBirthInput, { target: { value: '2007-01-01' } })
    expect(dateOfBirthInput).toHaveValue('')
  })
})
