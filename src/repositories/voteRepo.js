import prisma from '../config/db.js';

export async function getAll(id) {
  return await prisma.event.findMany({ where: { userId: id } });
}
export async function getAllVotedGameAndEventIds() {
  const [gameIds, eventIds] = await Promise.all([
    getVotedGameIds(),
    getVotedEventIds(),
  ]);
  return { gameIds, eventIds };
}
export async function create(vote) {
  const newVote = await prisma.vote.create({
    data: vote,
  });
  return newVote;
}
// export async function getVoteById(id) {
//   return await prisma.vote.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       userId: true,
//       eventId: true,
//       gameId: true,
//     },
//   });
// }
// repositories/voteRepo.js

// Return array of unique gameIds that have at least one vote
// export async function getVotedGameIds() {
//   const games = await prisma.vote.findMany({
//     where: { gameId: { not: null } },
//     distinct: ['gameId'],
//     select: { gameId: true },
//   });
//   return games.map((g) => g.gameId);
// }

// // Return array of unique eventIds that have at least one vote
// export async function getVotedEventIds() {
//   const events = await prisma.vote.findMany({
//     where: { eventId: { not: null } },
//     distinct: ['eventId'],
//     select: { eventId: true },
//   });
//   return events.map((e) => e.eventId);
// }

// // Fast boolean checks useful for middleware: does this game/event have any votes?
// export async function hasVotesForGame(gameId) {
//   const found = await prisma.vote.findFirst({
//     where: { gameId },
//     select: { id: true },
//   });
//   return !!found;
// }

// export async function hasVotesForEvent(eventId) {
//   const found = await prisma.vote.findFirst({
//     where: { eventId },
//     select: { id: true },
//   });
//   return !!found;
// }


export async function getById(id) {
  const vote = await prisma.vote.findUnique({
    where: { id },
    select: {
      id: true,
      owner: {
        select: {
          id: true,
          username: true,
        },
        eventId: true,
        gameId: true,
      },
    },
  });
  return vote;
}

// Return the number of votes for a given eventId
export async function countVotesByEvent(eventId) {
  const count = await prisma.vote.count({
    where: { eventId },
  });
  return count;
}

export async function countVotesByGame(gameId) {
  const count = await prisma.vote.count({
    where: { gameId },
  });
  return count;
}

export async function remove(id) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
// src/repositories/voteRepo.js

export async function updateVote(id, input) {
  try {
    return await prisma.vote.update({
      where: { id },
      data: input,
      select: { id: true, userId: true, eventId: true, gameId: true },
    });
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}
