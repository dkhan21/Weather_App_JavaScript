import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import WeatherFavorite, { QUERY } from './WeatherFavorite';

// Mock GraphQL query data
const mocks = [
  {
    request: {
      query: QUERY,
    },
    result: {
      data: {
        favorites: [
          { id: 1, city: 'New York' },
          { id: 2, city: 'Los Angeles' },
          { id: 3, city: 'London' },
        ],
      },
    },
  },
];

describe('WeatherFavorite component', () => {
  it('renders without crashing', () => {
    render(

        <WeatherFavorite />

    );
  });


});
