import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Navbar from './header'

afterEach(cleanup)

it('CheckboxWithLabel changes the text after click', () => {
  render(<Navbar />)

  const buttonMenu = screen.getByAltText('menu')
  expect(screen.getByTestId('nav')).toHaveClass('hidden')
  fireEvent.click(buttonMenu)

  expect(screen.getByTestId('nav')).toHaveClass('flex')
  expect(screen.getByTestId('nav')).not.toHaveClass('hidden')
})
