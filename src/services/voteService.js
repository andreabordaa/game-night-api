import {
  getAll,
  getById,
  create,
  countVotesByEvent,
  countVotesByGame,
  update,
  remove,
  getAllVotedGameAndEventIds as repoGetAllVotedGameAndEventIds,
  getVotesByEvent as repoGetVotesByEvent,
} from '../repositories/voteRepo.js';

// Get all unique gameIds and eventIds that have been voted on
export async function getAllVotedGameAndEventIds() {
  return await repoGetAllVotedGameAndEventIds();
}

// GET /events/:eventId/votes
export async function getVotesByEvent(eventId) {
  return await repoGetVotesByEvent(eventId);
}

// GET /votes/host
export async function getAllVotes(filter) {
  return await getAll(filter);
}

// GET /votes/:id
export async function getVoteById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find vote with id ${id}`);
    error.status = 404;
    throw error;
  }
}

// POST /events/
export async function createVote(data) {
  return await create(data);
}

export async function eventCountVotes(eventId) {
  return await countVotesByEvent(eventId);
}

export async function gameCountVotes(gameId) {
  return await countVotesByGame(gameId);
}

// PUT /events/:id
export async function updateVote(id, data) {
  const updatedVote = await update(id, data);
  if (updatedVote) return updatedVote;
  else {
    const error = new Error(`Cannot find vote with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function deleteVote(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find event with id ${id}`);
    error.status = 404;
    throw error;
  }
}
