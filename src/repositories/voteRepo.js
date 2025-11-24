import prisma from '../config/db.js';

export async function getAll(filter) {
  const conditions = {};
  if (filter && filter.ownerId) {
    // ownerId is stored as a string (UUID) in the schema
    conditions.ownerId = { equals: filter.ownerId };
  }
  if (filter && filter.search) {
    conditions.OR = [
      { name: { contains: filter.search, mode: 'insensitive' } },
      { description: { contains: filter.search, mode: 'insensitive' } },
    ];
  }

  console.log(conditions);
  const games = await prisma.game.findMany({
    where: conditions,
    select: {
      name: true,
      id: true,
      description: true,
      minPlayers: true,
      maxPlayers: true,
      owner: true,
    },
    orderBy: filter && filter.sortBy ? { [filter.sortBy]: filter.sortOrder } : undefined,
    take: filter && filter.limit ? filter.limit : undefined,
    skip: filter && filter.offset ? filter.offset : undefined,
  });
  return games;
}

export async function getById(id) {
  const game = await prisma.game.findUnique({
    where: { id },
    select: {
      name: true,
      id: true,
      description: true,
      minPlayers: true,
      maxPlayers: true,
      owner: true,
      description: true,
    },
  });
  return game;
}

export async function create(game) {
  const newGame = await prisma.game.create({
    data: game,
  });
  return newGame;
}

export async function update(id, updates) {
  try {
    const updatedGame = await prisma.game.update({
      where: { id },
      data: updates,
    });
    return updatedGame;
  } catch (error) {
    if (error.code === 'P2025') return null;
  }
}

export async function remove(id) {
  try {
    const deletedGame = await prisma.game.delete({
      where: { id },
    });
    return deletedGame;
  } catch (error) {
    if (error.code === 'P2025') return null;
  }
}
