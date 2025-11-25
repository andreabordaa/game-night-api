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

router.get('/', authenticate, validateGameQuery, getAllGamesHandler);

router.get('/:id',authenticate, validateGameId, getGameByIdHandler);

router.post('/', authenticate, validateCreateGame, createGameHandler);

router.put('/:id', authenticate,validateUpdateGame, updateGameHandler);

router.delete('/:id',authenticate, validateGameId, deleteGameHandler);

export default router;
