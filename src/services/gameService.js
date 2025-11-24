import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/gameRepo.js';

export async function getAllGames(filter) {
  return await getAll(filter);
}

export async function getGameById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find game with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function createGame(data) {
  return await create(data);
}

export async function updateGame(id, data) {
  const updatedGame = await update(id, data);
  if (updatedGame) return updatedGame;
  else {
    const error = new Error(`Cannot find game with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function deleteGame(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find game with id ${id}`);
    error.status = 404;
    throw error;
  }
}
