import { render } from '@redwoodjs/testing/web'

import TransitionHooks from './TransitionHooks'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TransitionHooks', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TransitionHooks />)
    }).not.toThrow()
  })
})
