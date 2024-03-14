import { render } from '@redwoodjs/testing/web'

import WeatherForm from './WeatherForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WeatherForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WeatherForm />)
    }).not.toThrow()
  })
})
