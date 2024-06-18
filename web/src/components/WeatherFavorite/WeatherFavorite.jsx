import React, { useState, useEffect } from 'react';
import { Metadata, useMutation } from '@redwoodjs/web';
import axios from 'axios';
import { gql, useQuery } from '@redwoodjs/web';
import IconWiDaySunny from './sun';
import IconWiRainMix from './rain';
import IconWiCloudy from './cloud';
import IconWiSnowflakeCold from './snow';
import IconWiStrongWind from './wind';
import IconWiMoonrise from './moon';
import { FaTrash } from 'react-icons/fa';
import { toast } from '@redwoodjs/web/toast'


const apiUrl = 'https://api.tomorrow.io/v4/weather/forecast';
const apiKey = 'ANYDS4YH4JZWR9YS8SC2WT7PG';

export const QUERY = gql`
  query FavoritesQuery {
    favorites {
      id
      city
      createdAt
    }
  }
`;

const DELETE_FAVORITE_MUTATION = gql`

  mutation DeleteFavorite($id: Int!){
    deleteFavorite(id: $id) {
      id
    }
  }

`;

const WeatherFavorite = () => {
  const [weatherDataArray, setWeatherDataArray] = useState([]);
  const { data } = useQuery(QUERY);

  const [deleteFavorite] = useMutation(DELETE_FAVORITE_MUTATION, {
    refetchQueries: [{query: QUERY}],
  })

  const handleDelete = async (city) => {
    try {
      const favorite = data.favorites.find((favorite) => favorite.city === city);
      if (favorite) {
        const id = parseInt(favorite.id); // Parse the id as an integer
        await deleteFavorite({ variables: { id } });
        toast("Deleted " + {city} + " from favorites!")
      }
    } catch (error) {
      console.error("Error Deleting Favorite", error.message);
    }
  };

  const isNightTime = () => {
    // Get current date and time
    const currentDate = new Date();
    // Get current hour (in 24-hour format)
    const currentHour = currentDate.getHours();
    // Check if current hour is past 8 PM (20:00) or before 6 AM (06:00)
    return currentHour >= 20 || currentHour < 6;
  };

  useEffect(() => {
    setWeatherDataArray([]);

    const fetchDataForCity = async (city) => {
      const formattedCity = encodeURIComponent(city.trim());
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days%2Ccurrent&key=ANYDS4YH4JZWR9YS8SC2WT7PG&contentType=json`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {}
        });

        const data = await response.json();

        // Add the weather data for the city to the array
        setWeatherDataArray((prevData) => [
          ...prevData,
          { city, data: data },
        ]);

        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 45000));
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
      }
    };

    // Check if data is available
    if (data) {
      // Iterate through favorite cities and make API calls
      data.favorites.forEach((favorite) => {
        fetchDataForCity(favorite.city);
      });
    }
  }, [data]);



  const formatUtcDate = utcDate => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(utcDate).toLocaleDateString('en-US', options);
  };

  const formatUtcDateDay = (utcDate) => {
    const options = { weekday: 'long' };
    const date = new Date(utcDate);

    // Add one day to the date
    date.setDate(date.getDate() + 1);

    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
    return dayOfWeek;
  };


  return (
    <div>
      <h2 style={{ fontFamily: 'cursive', textDecoration: 'underline'}}>{'Your Cities'}</h2>
      <p>

      </p>


      {weatherDataArray.map((weatherData, index) => (

          <div key={index} className= 'F_Display' style={{display: 'flex', flexDirection: 'row', marginBottom: '10px', justifyContent: 'center'}} >
            <div style={{
                borderColor: 'black',
                width: '300px',
                height: '300px',
                borderRadius: '10px',
                border: '5px solid black',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',}}
            >

              <p style={{ fontSize: '90px', paddingTop: '10px', marginBottom: '10px' }}>{Math.round((9 / 5) * weatherData.data.currentConditions.temp + 32)} F</p>
              <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{weatherData.city}</h2>
              <p style={{ marginBottom: '60px' }}>{formatUtcDate(weatherData.data.days[1].datetime)} </p>

            </div>


            <div className="Weather-info" style={{ display: 'flex', borderColor: 'black', width: '400px', height: '300px', borderRadius: '10px', border: '5px solid black' }}>
                <div style={{ flex: 1, padding: '10px' }}>

                          <p>Humidity: {weatherData.data.currentConditions.humidity}</p>
                          <p>Wind Speed: {weatherData.data.currentConditions.windspeed} mph</p>
                          <p>Visibility: {weatherData.data.currentConditions.visibility}</p>
                          <p>Cloud Coverage: {weatherData.data.currentConditions.cloudcover}</p>

                </div>
                <div style={{ flex: 1,  }}>
                    <div style={{display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', paddingTop: '0px', paddingLeft: '10px'}}
                    >

                                {isNightTime ? (
                                  <IconWiMoonrise />
                                ) : (
                                  weatherData && !(

                                    weatherData.data.currentConditions.cloudcover > 25 &&
                                    weatherData.data.currentConditions.windspeed > 8
                                  ) ? <IconWiDaySunny /> : null
                                )}


                            {weatherData.data.currentConditions.cloudcover > 25 && <IconWiCloudy />}

                            {weatherData.data.currentConditions.windspeed > 8 && <IconWiStrongWind />}


                    </div>
                </div>
            </div>

            <div style={{
                borderColor: 'black',
                width: '300px',
                height: '300px',
                borderRadius: '10px',
                border: '5px solid black',
                display: 'flex', flexDirection: 'column',

                }}
            >
              <div style={{}}>


                  <div style={{display: 'flex', flexDirection: 'column'}} >
                  <p style={{ marginLeft: '10px' }} >Today - {Math.round((9 / 5) * weatherData.data.currentConditions.temp + 32)} F</p>
                  {weatherData.data.days.slice(0, 5).map((day, innerIndex) => (
                        <div key={innerIndex} style={{display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
                          <p>{formatUtcDateDay(day.datetime)} - {Math.round((9 / 5) * day.temp + 32)} F</p>
                        </div>
                  ))}

                  </div>
              </div>

            </div>

            <button onClick={() => handleDelete(weatherData.city)} style={{ marginLeft: '10px', borderRadius: '5px', width: '50px', height: '30px', cursor: 'pointer' }}> <FaTrash/></button>

          </div>

          ))}



    </div>
  );
};

export default WeatherFavorite;
