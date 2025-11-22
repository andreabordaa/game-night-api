import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateEventId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Event id must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateEvent = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters'),

  body('location')
    .exists({ values: 'falsy' })
    .withMessage('location is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('location must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('location must be at least 3 characters'),

  body('eventDate')
    .exists({ values: 'falsy' })
    .withMessage('eventDate is required')
    .bail()
    .isISO8601()
    .withMessage('eventDate must be a valid date (YYYY-MM-dd)')
    .bail()
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date < now) {
        throw new Error('eventDate must be a future date');
      }
      return true;
    }),

  body('description')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('description must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('description must be at least 10 characters'),

  handleValidationErrors,
];

export const validateUpdateEvent = [
  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must contain at least 3 characters'),

  body('location')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('location must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('location must be at least 3 characters'),

  body('eventDate')
    .optional()
    .isISO8601()
    .withMessage('eventDate must be a valid date (YYYY-MM-dd)')
    .bail()
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date < now) {
        throw new Error('eventDate must be a future date');
      }
      return true;
    }),

  body('description')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('description must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('description must be at least 10 characters'),

  handleValidationErrors,
];
