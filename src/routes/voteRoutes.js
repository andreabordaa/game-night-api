import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateCreateVote,
  validateUpdateVote,
  validateVoteId,
  
} from '../middleware/voteValidators.js';

import {
  getAllVotesHandler,
  getVoteByIdHandler,
  createVoteHandler,
  updateVoteHandler,
  deleteVoteHandler,
  
} from '../controllers/voteController.js';
const router = express.Router();

router.get('/', authenticate, getAllVotesHandler);

router.get('/:id',authenticate, validateVoteId, getVoteByIdHandler);

router.post('/', authenticate, validateCreateVote, createVoteHandler);

router.put('/:id',authenticate,validateUpdateVote, updateVoteHandler);

router.delete('/:id', authenticate, deleteVoteHandler);

export default router;
