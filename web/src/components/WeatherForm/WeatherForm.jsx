import React, { useState } from 'react';
import { Metadata } from '@redwoodjs/web';
import axios from 'axios';
import { gql, useMutation } from '@redwoodjs/web';
import IconWiDaySunny from 'src/components/WeatherFavorite/sun';
import IconWiRainMix from 'src/components/WeatherFavorite/rain';
import IconWiCloudy from 'src/components/WeatherFavorite/cloud';
import IconWiSnowflakeCold from 'src/components/WeatherFavorite/snow';
import IconWiStrongWind from 'src/components/WeatherFavorite/wind';
import IconWiMoonrise from 'src/components/WeatherFavorite/moon';
import { FaStar } from 'react-icons/fa';
import { useAuth } from 'src/auth';

import { Link, routes } from '@redwoodjs/router'


const apiUrl = 'https://api.tomorrow.io/v4/weather/forecast';
const apiKey = 'LHpzgcsFLTJaoGReRuYIKDxYzz4IeSLz';

const CREATE = gql`
  mutation CreateFavoriteMutation($input: CreateFavoriteInput!) {
    createFavorite(input: $input){
      id
    }
  }

`


const WeatherForm = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null);
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const [createFavorite,  { loading, error }] = useMutation(CREATE);


  const getWeather = () => {
    axios
      .get(apiUrl, {
        params: {
          location: city,
          apikey: apiKey,
        },
      })
      .then(response => {
        setWeatherData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };
  //function called in submit button for search bar+ changes the city value for location parameter
  const handleCityChange = event => {
    setCity(event.target.value);
  };

  const formatUtcDate = utcDate => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(utcDate).toLocaleDateString('en-US', options);
  };

  const addToFavorites = async () => {
    try {
      const input = { city: city };
      await createFavorite({ variables: { input } });
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const extractCityName = (location) => {
    // Check if location is defined and not null
    if (location && typeof location === 'string') {
      // Split the location string by comma and trim whitespace
      const parts = location.split(',').map(part => part.trim());
      // Return the first part, which should be the city name
      return parts[0];
    } else {
      // If location is undefined or not a string, return an empty string or handle the case accordingly
      return '';
    }
  };

  const formatUtcDateDay = (utcDate) => {
    const options = { weekday: 'long' };
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(new Date(utcDate));
    return dayOfWeek;
  };

  const isNightTime = () => {
    // Get current date and time
    const currentDate = new Date();
    // Get current hour (in 24-hour format)
    const currentHour = currentDate.getHours();
    // Check if current hour is past 8 PM (20:00) or before 6 AM (06:00)
    return currentHour >= 20 || currentHour < 6;
  };



  return (
    <div>
      <div  style={{display: 'flex', flexDirection: 'row'}}>
          <h1 style={{ color: 'black' }}>
            Weather App
          </h1>
          {isAuthenticated ? (
                <div style={{
                  textDecoration: 'none',
                  paddingTop: '30px',
                  position: 'absolute',
                  right: 50}} >
                  <span>Logged in as {currentUser.name}</span>{' '}
                  <button type="button" onClick={logOut}>
                    Logout
                  </button>
                </div>
              ) : (

                <Link  className="loginLink" to={routes.login()}  style={{
                textDecoration: 'none',
                paddingTop: '30px',
                position: 'absolute',
                right: 50}} >Login</Link>
              )}
      </div>
      <h1 style={{ paddingLeft: '800px', paddingTop: '50px' }}>Enter Your City</h1>

      <main>
        <div>
          <input onChange={handleCityChange} type= 'text' placeholder="Enter city" value={city} style={{ fontSize: '20px' , fontFamily: 'Brush Script MT, cursive' ,width: '200px', height: '35px', marginLeft: '750px' ,marginRight: '10px'}}/>
          <button onClick={getWeather} style={{ marginLeft: '10px',borderRadius: '5px',width: '150px', height: '28px', cursor: 'pointer' }} >Get Weather</button>
          {weatherData && (
            <button onClick={addToFavorites} style={{ marginLeft: '10px',borderRadius: '5px',width: '40px', height: '20px', cursor: 'pointer' }}>
              <FaStar/>
            </button>
          )}
        </div>
      {weatherData && (
          <div>

            <h2 style={{fontFamily: 'cursive', textDecoration: 'underline'}}>Search Results</h2>

            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>

                  <div style={{
                    borderColor: 'black',
                    width: '300px',
                    height: '300px',
                    borderRadius: '10px',
                    border: '5px solid black',
                    marginLeft: '500px',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',}}
                  >

                        <p style={{ fontSize: '90px', paddingTop: '10px', marginBottom: '10px' }}>{Math.round((9 / 5) *weatherData.timelines.minutely[0].values.temperature + 32)} F</p>
                        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{city}</h2>
                        <p style={{ marginBottom: '60px' }}>{formatUtcDate(weatherData.timelines.daily[0].time)} </p>

                  </div>
                  {/* 2nd Box*/}
                  <div style={{ display: 'flex', borderColor: 'black', width: '400px', height: '300px', borderRadius: '10px', border: '5px solid black' }} >
                      <div style={{ flex: 1, padding: '10px' }}>


                          <p>Humidity: {weatherData.timelines.minutely[0].values.humidity}</p>
                          <p>Wind Speed: {weatherData.timelines.minutely[0].values.windSpeed} mph</p>
                          <p>Visibility: {weatherData.timelines.minutely[0].values.visibility}</p>
                          <p>Rain Intensity: {weatherData.timelines.minutely[0].values.rainIntensity}</p>
                          <p>Snow Intensity: {weatherData.timelines.minutely[0].values.snowIntensity}</p>
                          <p>Cloud Coverage: {weatherData.timelines.minutely[0].values.cloudCover}</p>
                          <p>Freezing Rain Intensity: {weatherData.timelines.minutely[0].values.freezingRainIntensity}</p>

                      </div>
                      <div style={{ flex: 1,  }}>
                        {/*Icons*/}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: '0px',
                            paddingLeft: '10px'}}
                          >
                            {isNightTime ? (
                                  <IconWiMoonrise />
                                ) : (
                                  weatherData && !(
                                    weatherData.timelines.minutely[0].values.rainIntensity > 10 &&
                                    weatherData.timelines.minutely[0].values.snowIntensity > 10 &&
                                    weatherData.timelines.minutely[0].values.cloudCover > 25 &&
                                    weatherData.timelines.minutely[0].values.windSpeed > 8
                                  ) ? <IconWiDaySunny /> : null
                                )}

                            {weatherData.timelines.minutely[0].values.rainIntensity > 10 && <IconWiRainMix />}

                            {weatherData.timelines.minutely[0].values.snowIntensity > 5 && <IconWiSnowflakeCold />}

                            {weatherData.timelines.minutely[0].values.cloudCover > 25 && <IconWiCloudy />}

                            {weatherData.timelines.minutely[0].values.windSpeed > 8 && <IconWiStrongWind />}


                          </div>
                      </div>
                  </div>
                  {/*3rd Box */}
                  <div style={{
                    borderColor: 'black',
                    width: '300px',
                    height: '300px',
                    borderRadius: '10px',
                    border: '5px solid black',
                    display: 'flex', flexDirection: 'column',

                    }}>

                      <div style={{display: 'flex', flexDirection: 'column'}}>
                      {weatherData.timelines.daily.map((day, innerIndex) => (
                          <div key={innerIndex} style={{display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
                            <p>{innerIndex === 0 ? 'Today' : formatUtcDateDay(day.time)}</p>
                            <p style={{marginLeft: '5px'}} >- {innerIndex === 0 ? Math.round((9 / 5) * weatherData.timelines.minutely[0].values.temperature + 32) : Math.round((9 / 5) * day.values.temperatureAvg +32)} F</p>
                          </div>
                      ))}

                      </div>

                  </div>


            </div>


          </div>
        )}

      </main>

      <main>


      </main>


    </div>
  )
}

export default WeatherForm
