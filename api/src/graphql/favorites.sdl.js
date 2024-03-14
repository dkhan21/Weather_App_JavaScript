// ./api/src/graphql/favorites.sdl.js
export const schema = gql`
  type Favorite {
    id: Int!
    city: String!
    createdAt: DateTime!
  }

  input CreateFavoriteInput {
    city: String!
  }

  input UpdateFavoriteInput {
    city: String
    # Add other input fields as needed
  }

  type Query {
    favorites: [Favorite!]!  @skipAuth
    favorite(id: Int!): Favorite @skipAuth
  }

  type Mutation {
    createFavorite(input: CreateFavoriteInput!): Favorite! @skipAuth
    updateFavorite(id: String!, input: UpdateFavoriteInput!): Favorite! @skipAuth
    deleteFavorite(id: Int!): Favorite! @skipAuth
  }
`;
