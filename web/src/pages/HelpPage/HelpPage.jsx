import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HelpPage = () => {
  return (
    <>
      <Metadata title="Help" description="Help page" />

      <h1>HelpPage</h1>
      <p>
        Find me in <code>./web/src/pages/HelpPage/HelpPage.jsx</code>
      </p>
      <p>
        My default route is named <code>help</code>, link to me with `
        <Link to={routes.help()}>Help</Link>`
      </p>
    </>
  )
}

export default HelpPage
