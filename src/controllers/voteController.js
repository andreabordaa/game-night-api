import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from '../services/gameService.js';
// GET /games/host
export async function getAllGamesHandler(req, res) {
  const {
    // ownerId,
    search,
    sortBy = 'id',
    sortOrder = 'asc',
    minPlayers,
    maxPlayers,
    // limit= 10,
    // offset=10,
  } = req.query;
  const filter = {};
  if (ownerId) filter.ownerId = ownerId;
  if (search) filter.search = search;
  filter.sortBy = sortBy;
  filter.sortOrder = sortOrder;
  filter.minPlayers = minPlayers;
  filter.maxPlayers = maxPlayers;

  // filter.limit = parseInt(limit);
  // filter.offset = parseInt(offset);
  let result = await getAllGames(filter);
  res.status(200).json(result);
}

export async function getGameByIdHandler(req, res) {
  let id = req.params.id;
  let game = await getGameById(id);
  res.status(200).json(game);
}

export async function createGameHandler(req, res) {
  const data = {
    name: req.body.name,
    description: req.body.description,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,

    ownerId: req.user.id, 
  };
  let newGame = await createGame(data);
  res.status(201).json(newGame);
}

export async function updateGameHandler(req, res) {
  let id = req.params.id;
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.description) updates.description = req.body.description;
  if (req.body.ownerId) updates.ownerId = req.body.ownerId;
  const updatedGame = await updateGame(id, updates);
  res.status(200).json(updatedGame);
}

export async function deleteGameHandler(req, res) {
  let id = req.params.id;
  await deleteGame(id);
  res.status(204).send();
}
