import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateGameId,
  validateUpdateGame,
  validateCreateGame,
  validateGameQuery,
} from '../middleware/gameValidators.js';

import {
  getAllGamesHandler,
  getGameByIdHandler,
  createGameHandler,
  updateGameHandler,
  deleteGameHandler,
} from '../controllers/gameController.js';

const router = express.Router();

router.get('/',authenticate, validateGameQuery, getAllGamesHandler);

router.get('/:id',validateGameId, getGameByIdHandler);

router.post('/', validateCreateGame, createGameHandler);

router.put('/:id',validateUpdateGame, updateGameHandler);

router.delete('/:id',validateGameId, deleteGameHandler);

export default router;
