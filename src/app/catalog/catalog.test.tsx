import { render, screen } from '@testing-library/react'
import Page from './page'
import '@testing-library/jest-dom'

describe('Catalog page', () => {
  it('renders a greeting', () => {
    render(<Page />)

    const greet = screen.getByText('Hello, Catalog Page!')

    expect(greet).toBeInTheDocument()
  })
})
