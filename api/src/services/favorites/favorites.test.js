import {
  favorites,
  favorite,
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from './favorites'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('favorites', () => {
  scenario('returns all favorites', async (scenario) => {
    const result = await favorites()

    expect(result.length).toEqual(Object.keys(scenario.favorite).length)
  })

  scenario('returns a single favorite', async (scenario) => {
    const result = await favorite({ id: scenario.favorite.one.id })

    expect(result).toEqual(scenario.favorite.one)
  })

  scenario('creates a favorite', async () => {
    const result = await createFavorite({
      input: { city: 'String' },
    })

    expect(result.city).toEqual('String')
  })

  scenario('updates a favorite', async (scenario) => {
    const original = await favorite({
      id: scenario.favorite.one.id,
    })
    const result = await updateFavorite({
      id: original.id,
      input: { city: 'String2' },
    })

    expect(result.city).toEqual('String2')
  })

  scenario('deletes a favorite', async (scenario) => {
    const original = await deleteFavorite({
      id: scenario.favorite.one.id,
    })
    const result = await favorite({ id: original.id })

    expect(result).toEqual(null)
  })
})
