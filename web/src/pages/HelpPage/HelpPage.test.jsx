import { render } from '@redwoodjs/testing/web'

import HelpPage from './HelpPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HelpPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HelpPage />)
    }).not.toThrow()
  })
})
