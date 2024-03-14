import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe'; // Optional: For accessibility testing
import { mockGraphQLQuery } from '@redwoodjs/testing/api'; // If using RedwoodJS mock utilities
import { MockedProvider } from '@apollo/client/testing'; // If using Apollo Client

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
  // Mock GraphQL query for RedwoodJS
  mockGraphQLQuery(QUERY, () => ({
    favorites: [
      { id: 1, city: 'New York' },
      { id: 2, city: 'Los Angeles' },
      { id: 3, city: 'London' },
    ],
  }));

  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WeatherFavorite />
      </MockedProvider>
    );
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WeatherFavorite />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  // Example of accessibility test using jest-axe
  it('has no accessibility issues', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WeatherFavorite />
      </MockedProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
