import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import NavBar from 'src/components/NavBar/NavBar'

const AboutPage = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main style={{ paddingTop: '100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          <h2 style={{ fontSize: '50px', justifyContent: 'center', display: 'flex', color: 'black' }}>What is this site?</h2>
          <div style={{ width: '900px', padding: '20px', border: 'none', lineHeight: '1.5', borderRadius: '20px', background: 'linear-gradient(0deg, white, lightblue)' }}>
            <a style={{ fontSize: '27px', font: 'inherit' }}>
              This weather application provides accurate and up-to-date weather forecasts for any location. You can check the current weather conditions or select a specific date to see the forecast for that day. Addition to that, login to save the cities you want for your future arrivals. Whether you're planning a trip or just curious about the weather, our application has you covered.
            </a>
          </div>

          <h2 style={{ fontSize: '50px', justifyContent: 'center', display: 'flex', color: 'black' }}>How does it work?</h2>
          <div style={{ width: '900px', padding: '20px', border: 'none', lineHeight: '1.5', borderRadius: '20px', background: 'linear-gradient(0deg, white, lightblue)' }}>
            <ul style={{ listStyleType: 'disc', padding: '0 20px', margin: '0', fontSize: '27px', font: 'inherit' }}>
              <li>Select a date.</li>
              <li>Choose a city.</li>
              <li>Get your weather!</li>
            </ul>
          </div>


        </div>



      </main>
    </>
  )
}

export default AboutPage
