import { render, screen } from '@testing-library/react'
import NotFound from './not-found'
import '@testing-library/jest-dom'

describe('Main page', () => {
  it('renders a greeting', () => {
    render(<NotFound />)

    const greet = screen.getByText('404 Not Found')

    expect(greet).toBeInTheDocument()
  })
})