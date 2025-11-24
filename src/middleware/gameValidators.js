import { param, body,query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateGameId = [
  param('id').isUUID().withMessage('Game id must be a valid UUID'),
  handleValidationErrors,
];


const allowedSortFields = ['id', 'name', 'minPlayers', 'maxPlayers'];
const allowedSortOrders = ['asc', 'desc'];

export const validateGameQuery = [
  
  query('search').optional().isString().withMessage('search must be a string'),

  query('sortBy')
    .optional()
    .isIn(allowedSortFields)
    .withMessage(`sortBy must be one of: ${allowedSortFields.join(', ')}`),

  query('sortOrder')
    .optional()
    .isIn(allowedSortOrders)
    .withMessage(`sortOrder must be one of: ${allowedSortOrders.join(', ')}`),

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


export const validateCreateGame = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('name is required')
    .bail()
    .trim()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters'),

  body('minPlayers')
    .exists()
    .withMessage('minPlayers is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('minPlayers must be an integer greater than 0'),

  body('maxPlayers')
    .exists()
    .withMessage('maxPlayers is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('maxPlayers must be an integer greater than 0')
    .bail()
    .custom((value, { req }) => {
      const min = Number(req.body.minPlayers);
      const max = Number(value);
      if (Number.isInteger(min) && Number.isInteger(max) && max < min) {
        throw new Error(
          'maxPlayers must be greater than or equal to minPlayers',
        );
      }
      return true;
    }),

  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('description must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('description must be at least 5 characters'),

  // Do not accept ownerId from client when creating a game (server assigns it)
  body('ownerId')
    .optional()
    .custom(() => true),

  handleValidationErrors,
];

export const validateUpdateGame = [
  body('name')
    .optional()
    .trim()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must contain at least 3 characters'),

  body('minPlayers')
    .optional()
    .isInt({ min: 1 })
    .withMessage('minPlayers must be an integer greater than 0'),

  body('maxPlayers')
    .optional()
    .isInt({ min: 1 })
    .withMessage('maxPlayers must be an integer greater than 0')
    .bail()
    .custom((value, { req }) => {
      const min =
        req.body.minPlayers !== undefined
          ? Number(req.body.minPlayers)
          : undefined;
      const max = Number(value);
      if (min !== undefined && Number.isInteger(min) && max < min) {
        throw new Error(
          'maxPlayers must be greater than or equal to minPlayers',
        );
      }
      return true;
    }),

  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('description must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('description must be at least 5 characters'),

  handleValidationErrors,
];
