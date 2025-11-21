import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateUserRegister = [
  body('email')
    .exists({ values: 'false' })
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

  body('username')
    .exists({ values: 'false' })
    .withMessage('username is required')
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage(
      'username must contain at least 3 characters and at most 64 characters',
    ),

  body('password')
    .exists({ values: 'false' })
    .withMessage('password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'password must contain at least 8 characters and at most 64 characters',
    ),

  handleValidationErrors,
];

export const validateUserLogin = [
  body('email')
    .exists({ values: 'false' })
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

  body('password')
    .exists({ values: 'false' })
    .withMessage('password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'password must contain at least 8 characters and at most 64 characters',
    ),

  handleValidationErrors,
];

export const validateUserUpdate = [
  body('email')
    .optional()
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail(),

  body('username')
    .optional()
    .notEmpty()
    .withMessage('username cannot be empty')
    .isLength({ min: 3, max: 64 })
    .withMessage(
      'username must contain at least 3 characters and at most 64 characters',
    ),

  body('password')
    .optional()
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'password must contain at least 8 characters and at most 64 characters',
    ),

  handleValidationErrors,

  (req, res, next) => {
    const body = req.body || {};
    if (!body.email && !body.password && !body.username) {
      return res.status(400).json({
        error:
          'At least one field (email, password, or username) must be provided.',
      });
    }
    next();
  },
];

const validRoles = ['ADMIN', 'USER'];
export const validateUserRole = [
  body('role')
    .exists({ values: 'false' })
    .withMessage('role is required')
    .bail()
    .isIn(validRoles)
    .withMessage(`role must be one of: ${validRoles.join(', ')}`),

  handleValidationErrors,
];
