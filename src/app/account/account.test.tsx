import { render, screen } from '@testing-library/react'
import Page from './page'
import '@testing-library/jest-dom'

describe('Account page', () => {
  it('renders a greeting', () => {
    render(<Page />)

    const greet = screen.getByText('Hello, Account Page!')

    expect(greet).toBeInTheDocument()
  })
})
