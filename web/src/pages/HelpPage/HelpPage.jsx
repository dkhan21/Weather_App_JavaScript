import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import NavBar from 'src/components/NavBar/NavBar'
import { Trivia, SlideDown } from 'src/components/TransitionHooks' // Adjust the import path based on your project structure

const HelpPage = () => {
  return (
    <>
      <Metadata title="Help Page" />
      <header>
        <NavBar />
      </header>
      <main className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexGrow: 1 }} >
          <a style={{ fontSize: '50px', fontFamily: 'inherit', fontWeight: 'bold', paddingBottom: '50px' }}>Need Help?</a>
          <Trivia label="How to search for a city?">
            <SlideDown>
              <li>Go to the <Link
                style={{ color: 'black' }}
                onMouseOver={(e) => {
                  e.currentTarget.style.textDecoration = 'underline'
                  e.currentTarget.style.color = 'gray'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.textDecoration = 'none'
                  e.currentTarget.style.color = 'black'
                }}
                to={routes.home()}
              >Home </Link> page.</li>
              <li>Select a date (optional).</li>
              <li>Choose a city.</li>
              <li>Get your weather!</li>
            </SlideDown>
          </Trivia>

          <Trivia label="How to login?">
            <SlideDown>
              <li>You can login by clicking the <Link
                style={{ color: 'black', textDecoration: 'none' }}
                onMouseOver={(e) => {
                  e.currentTarget.style.textDecoration = 'underline'
                  e.currentTarget.style.color = 'gray'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.textDecoration = 'none'
                  e.currentTarget.style.color = 'black'
                }}
                to={routes.login()}
              >Login </Link> button on the top right hand corner!</li>
            </SlideDown>
          </Trivia>

          <Trivia label="How to add a city as favorites?">
            <SlideDown>
              <li>Login</li>
              <li>Retrieve your weather</li>
              <li>Click the star icon that's located on the right hand side of the weather forecast display</li>
            </SlideDown>
          </Trivia>

          <Trivia label="How to change background color?">
            <SlideDown>
              <li>Locate the Switch Icon (Near the About Section).</li>
              <li>Switch between White/Blue and Black/Gray</li>
            </SlideDown>
          </Trivia>
        </div>
      </main>
    </>
  )
}

export default HelpPage
