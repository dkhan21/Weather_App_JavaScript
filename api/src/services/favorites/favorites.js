import { db } from 'src/lib/db'

export const favorites = () => {
  return db.favorite.findMany()
}

export const favorite = ({ id }) => {
  return db.favorite.findUnique({
    where: { id },
  })
}

export const createFavorite = async ({ input }) => {
  try {
    // Use Prisma Client to create a new favorite
    const newFavorite = await db.favorite.create({
      data: {
        city: input.city,
      },
    });

    return newFavorite;
  } catch (error) {
    console.error('Error creating favorite:', error);
    throw new Error('Unable to create favorite');
  }
};

export const updateFavorite = ({ id, input }) => {
  return db.favorite.update({
    data: input,
    where: { id },
  })
}

export const deleteFavorite = ({ id }) => {
  return db.favorite.delete({
    where: { id },
  })
}
