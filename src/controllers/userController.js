import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserRole,
} from '../services/userService.js';

export async function getAllUsersHandler(req, res) {
  const users = await getAllUsers();
  res.status(200).json(users);
}

export async function getUserHandler(req, res) {
  const userId = req.user.id;
  const user = await getUser(userId);
  res.status(200).json(user);
}

export async function updateUserHandler(req, res) {
  const userId = req.user.id;
  const updates = {};
  if (req.body.email) updates.email = req.body.email;
  if (req.body.username) updates.username = req.body.username;
  if (req.body.password) updates.password = req.body.password;
  const user = await updateUser(userId, updates);
  res.status(200).json(user);
}

export async function deleteUserHandler(req, res) {
  const userId = req.user.id;
  await deleteUser(userId);
  res.status(204).send();
}

export async function updateUserRoleHandler(req, res) {
  const userId = req.params.id;
  const role = req.body.role;
  const updatedUser = await updateUserRole(userId, role);
  res.status(200).json(updatedUser);
}
