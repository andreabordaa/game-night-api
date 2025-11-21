import express from 'express';
import {
  deleteUserHandler,
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
  updateUserRoleHandler,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateUserUpdate,
  validateUserRole,
} from '../middleware/userValidators.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/me', authenticate, getUserHandler);
router.put('/me', authenticate, validateUserUpdate, updateUserHandler);
router.delete('/me', authenticate, deleteUserHandler);
router.patch(
  '/:id/role',
  authenticate,
  authorizeRoles('ADMIN'),
  validateUserRole,
  updateUserRoleHandler,
);

export default router;
