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

const apiUrl = 'https://api.tomorrow.io/v4/weather/forecast';
const apiKey = 'LHpzgcsFLTJaoGReRuYIKDxYzz4IeSLz';

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
      try {
        const response = await axios.get(apiUrl, {
          params: {
            location: city,
            apikey: apiKey,
          },
        });

        // Add the weather data for the city to the array
        setWeatherDataArray((prevData) => [
          ...prevData,
          { city, data: response.data },
        ]);
        console.log(response.data)
        await new Promise(resolve => setTimeout(resolve, 45000));
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
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(new Date(utcDate));
    return dayOfWeek;
  };


  return (
    <div>
      <h2 style={{ fontFamily: 'cursive', textDecoration: 'underline'}}>{'Your Cities'}</h2>
      <p>

      </p>


      {weatherDataArray.map((weatherData, index) => (

          <div key={index} className= 'F_Display' style={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}} >

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

              <p style={{ fontSize: '90px', paddingTop: '10px', marginBottom: '10px' }}>{Math.round((9 / 5) * weatherData.data.timelines.minutely[0].values.temperature + 32)} F</p>
              <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{weatherData.city}</h2>
              <p style={{ marginBottom: '60px' }}>{formatUtcDate(weatherData.data.timelines.minutely[0].time)} </p>

            </div>


            <div className="Weather-info" style={{ display: 'flex', borderColor: 'black', width: '400px', height: '300px', borderRadius: '10px', border: '5px solid black' }}>
                <div style={{ flex: 1, padding: '10px' }}>

                    <p>Humidity: {weatherData.data.timelines.minutely[0].values.humidity}</p>
                    <p>Wind Speed: {weatherData.data.timelines.minutely[0].values.windSpeed} mph</p>
                    <p>Visibility: {weatherData.data.timelines.minutely[0].values.visibility}</p>
                    <p>Rain Intensity: {weatherData.data.timelines.minutely[0].values.rainIntensity}</p>
                    <p>Snow Intensity: {weatherData.data.timelines.minutely[0].values.snowIntensity}</p>
                    <p>Cloud Coverage: {weatherData.data.timelines.minutely[0].values.cloudCover}</p>
                    <p>Freezing Rain Intensity: {weatherData.data.timelines.minutely[0].values.freezingRainIntensity}</p>

                </div>
                <div style={{ flex: 1,  }}>
                    <div style={{display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', paddingTop: '0px', paddingLeft: '10px'}}
                    >

                        {isNightTime || (weatherData.data.timelines.minutely[0].values.rainIntensity > 10 )&&
                         (weatherData.data.timelines.minutely[0].values.snowIntensity > 10) &&
                         (weatherData.data.timelines.minutely[0].values.cloudCover > 0) &&
                         (weatherData.data.timelines.minutely[0].values.windSpeed > 10)  ? <IconWiMoonrise/> : <IconWiDaySunny/>}

                        {weatherData.data.timelines.minutely[0].values.rainIntensity > 10 && <IconWiRainMix />}

                        {weatherData.data.timelines.minutely[0].values.snowIntensity > 5 && <IconWiSnowflakeCold />}

                        {weatherData.data.timelines.minutely[0].values.cloudCover > 25 && <IconWiCloudy />}

                        {weatherData.data.timelines.minutely[0].values.windSpeed > 10 && <IconWiStrongWind />}


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

                  {weatherData.data.timelines.daily.map((day, innerIndex) => (
                    <div key={innerIndex} style={{display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
                      <p>{innerIndex === 0 ? 'Today' : formatUtcDateDay(day.time)}</p>
                      <p style={{marginLeft: '5px'}} >- {innerIndex === 0 ? Math.round((9 / 5) * weatherData.data.timelines.minutely[0].values.temperature + 32) : Math.round((9 / 5) * day.values.temperatureAvg +32)} F</p>
                    </div>
                  ))}

                  </div>
              </div>

            </div>

            <button onClick={() => handleDelete(weatherData.city)} style={{ marginLeft: '10px', borderRadius: '5px', width: '50px', height: '30px', borderRadius: '5px', cursor: 'pointer' }}> <FaTrash/></button>

          </div>
          ))}

    </div>
  );
};

export default WeatherFavorite;
