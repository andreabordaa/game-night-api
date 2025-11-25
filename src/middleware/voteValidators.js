// voteValidator.js
import { param, body, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateVoteId = [
  param('id').isUUID().withMessage('Vote id must be a valid UUID'),
  handleValidationErrors,
];

export const validateEventId = [
  param('eventId').isUUID().withMessage('Event id must be a valid UUID'),
  handleValidationErrors,
];

const allowedVoteSortFields = ['id', 'createdAt'];
const allowedVoteSortOrders = ['asc', 'desc'];

export const validateCreateVote = [
  body('eventId')
    .notEmpty()
    .withMessage('eventId is required')
    .isUUID()
    .withMessage('eventId must be a valid UUID'),

  body('gameId')
    .notEmpty()
    .withMessage('gameId is required')
    .isUUID()
    .withMessage('gameId must be a valid UUID'),

  handleValidationErrors,
];

export const validateUpdateVote = [
  body('eventId')
    .optional()
    .isUUID()
    .withMessage('eventId must be a valid UUID'),

  body('gameId').optional().isUUID().withMessage('gameId must be a valid UUID'),

  body('userId').optional().isUUID().withMessage('userId must be a valid UUID'),

  handleValidationErrors,
];

// Special validator for getting votes by event
export const validateEventVotesQuery = [
  query('sortBy')
    .optional()
    .isIn(allowedVoteSortFields)
    .withMessage(`sortBy must be one of: ${allowedVoteSortFields.join(', ')}`),

  query('sortOrder')
    .optional()
    .isIn(allowedVoteSortOrders)
    .withMessage(
      `sortOrder must be one of: ${allowedVoteSortOrders.join(', ')}`,
    ),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be an integer between 1 and 100'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be 0 or a positive integer'),

  handleValidationErrors,
];
