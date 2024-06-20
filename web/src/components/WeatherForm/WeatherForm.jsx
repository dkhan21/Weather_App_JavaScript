import React, { useState, useEffect } from 'react';
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
import { toast, Toaster } from '@redwoodjs/web/toast'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Link, routes } from '@redwoodjs/router'
import NavBar from 'src/components/NavBar'

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
  const [weatherData, setWeatherData] = useState();
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [createFavorite, { loading, error }] = useMutation(CREATE);


  //This is for handling the users selected date for the city they want the forecast of.
  //Uses material ui, imoprted the calender.

  //Initialize the date we use in parameter of URL
  const [selectedDate, setSelectedDate] = useState(new Date());

  //Format the date from date icon value to passable object in API URL
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    if (!date) {
      setSelectedDate(null);
      setFormattedDate('');
      return;
    }

    setSelectedDate(date);
  };



  useEffect(() => {
    console.log('Formatted Date:', selectedDate);
  }, [selectedDate]);



  //Function that calls the Weather API.
  const getWeather = () => {
    const formattedCity = encodeURIComponent(city.trim());

    const date4URL = formatDate(selectedDate)
    //This is for the URL when the date is  selected. Current Day is needed
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formattedCity}/${date4URL}?unitGroup=metric&include=days,current,forecast&key=ANYDS4YH4JZWR9YS8SC2WT7PG&contentType=json`;

    //This is for the URL when the date is selected in the calender for another day
    if (date4URL === formatDate(new Date())) {
      url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formattedCity}?unitGroup=metric&include=days,current,forecast&key=ANYDS4YH4JZWR9YS8SC2WT7PG&contentType=json`;
    }

    fetch(url, {
      method: 'GET',
      headers: {}
    })
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        console.log(data);
        //Checking the date status
        console.log(selectedDate)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });

  };

  //function called in submit button for search bar+ changes the city value for location parameter
  const handleCityChange = event => {
    setCity(event.target.value);
  };

  const formatUtcDate = (utcDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(utcDate);
    if (selectedDate === formatDate(new Date())) {
      date.setDate(date.getDate() + 1);
    } else {
      date.setDate(date.getDate() + 0);
    }

    return date.toLocaleDateString('en-US', options);
  };


  const addToFavorites = async () => {
    try {
      const input = { city: city };
      await createFavorite({ variables: { input } });
      toast.success('Successfully added city to Favorites!')
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast('Could not add city to Favorites');
    }
  };


  //Funciton to format the day of the week.
  const formatUtcDateDay = (utcDate) => {
    const options = { weekday: 'long' };
    const date = new Date(utcDate);

    // Add one day to the date
    date.setDate(date.getDate() + 1);

    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
    return dayOfWeek;
  };

  //Function to check for the night time icons displayed or no?
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
      <header>
        <NavBar />
      </header>

      <h1 style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>Enter Your City</h1>

      <main>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select a date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <input onChange={handleCityChange} type='text' placeholder="Enter city" value={city} style={{ fontSize: '20px', fontFamily: 'Brush Script MT, cursive', width: '200px', height: '35px', marginLeft: '20px', marginTop: '7px' }} />
          <button onClick={getWeather} style={{ marginLeft: '10px', marginTop: '15px', borderRadius: '3px', width: '150px', height: '28px', cursor: 'pointer', backgroundColor: "white", fontSize: '17px', fontFamily: 'Brush Script MT, cursive' }} >Get Weather!</button>
          ,
        </div>
        {weatherData && (
          <div>
            <h2 style={{ fontFamily: 'cursive', textDecoration: 'underline' }}>Search Results</h2>
            {/*Created a Main box to be centered into the the middle of the site. Which contains 3 boxes inside*/}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/*This is the first box which contains the temperature*/}
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>



                <div style={{
                  borderColor: 'black',
                  width: '300px',
                  height: '300px',
                  borderRadius: '10px',
                  border: '5px solid black',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >


                  <p style={{ fontSize: '90px', paddingTop: '10px', marginBottom: '10px' }}>{Math.round((9 / 5) * weatherData.days[0].temp + 32)} F</p>
                  <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{city}</h2>
                  <p style={{ marginBottom: '60px' }}>{formatUtcDate(weatherData.days[0].datetime)} </p>

                </div>
                {/* 2nd Box that contains the extra details and icons for the day*/}
                <div style={{ display: 'flex', borderColor: 'black', width: '400px', height: '300px', borderRadius: '10px', border: '5px solid black' }} >
                  <div style={{ flex: 1, padding: '10px' }}>


                    <p>Humidity: {weatherData.days[0].humidity}</p>
                    <p>Wind Speed: {weatherData.days[0].windspeed} mph</p>
                    <p>Visibility: {weatherData.days[0].visibility}</p>
                    <p>Cloud Coverage: {weatherData.days[0].cloudcover}</p>

                  </div>
                  <div style={{ flex: 1, }}>
                    {/*Icons*/}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: '0px',
                      paddingLeft: '10px'
                    }}
                    >
                      {isNightTime ? (
                        <IconWiMoonrise />
                      ) : (
                        weatherData && !(

                          weatherData.days[0].cloudcover > 25 &&
                          weatherData.days[0].windspeed > 8
                        ) ? <IconWiDaySunny /> : null
                      )}


                      {weatherData.days[0].cloudcover > 25 && <IconWiCloudy />}

                      {weatherData.days[0].windspeed > 8 && <IconWiStrongWind />}


                    </div>
                  </div>
                </div>
                {/*3rd Box that display the weather in farenhiet temperature for the WEEK!*/}
                <div style={{
                  borderColor: 'black',
                  width: '300px',
                  height: '300px',
                  borderRadius: '10px',
                  border: '5px solid black',
                  display: 'flex', flexDirection: 'column',

                }}>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/*
                      //This is a for loop that reads the API json response.
                      //It displays the weather forecast thru out the week.
                      //Starts with 1-7. But index 0 is first day.
                      */}

                    {formatDate(selectedDate) === formatDate(new Date()) ? <p style={{ marginLeft: '10px' }} >Today - {Math.round((9 / 5) * weatherData.currentConditions.temp + 32)} F</p> :

                      <p style={{ marginLeft: '10px' }} >Today - {Math.round((9 / 5) * weatherData.days[0].temp + 32)} F</p>
                    }


                    {weatherData.days.slice(0, 5).map((day, innerIndex) => (
                      <div key={innerIndex} style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
                        <p>{formatUtcDateDay(day.datetime)} - {Math.round((9 / 5) * day.temp + 32)} F</p>
                      </div>
                    ))}

                  </div>

                </div>

                {/*Favorite Button :) */}

                {weatherData && isAuthenticated ? (
                  <button onClick={addToFavorites} style={{ marginLeft: '10px', marginTop: '0px', borderRadius: '5px', width: '50px', height: '30px', cursor: 'pointer', backgroundColor: 'white' }}>
                    <FaStar />
                  </button>
                )
                  :
                  (
                    <div style={{ marginLeft: '10px', padding: '10px', border: '5px solid black', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'black', height: '20px', borderColor: 'black', fontSize: '16px' }}>
                      <p style={{ margin: '0', textAlign: 'center' }}>Log in to add city as Favorite</p>
                    </div>
                  )
                }

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
