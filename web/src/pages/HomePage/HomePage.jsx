import React, { useState } from 'react';
import { Metadata } from '@redwoodjs/web';
import axios from 'axios';
import WeatherForm from 'src/components/WeatherForm/WeatherForm';
import WeatherFavorite from 'src/components/WeatherFavorite/WeatherFavorite';



const HomePage = () => {

  return (
    <>
      <Metadata title="Home" description="Home page" />
      <WeatherForm/>
      <WeatherFavorite/>

    </>
  );
};

export default HomePage;
