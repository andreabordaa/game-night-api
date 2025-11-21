import bcrypt from 'bcrypt';
import {
  findAllUsers,
  findUserById,
  remove,
  updateUserById,
  updateRole,
} from '../repositories/userRepo.js';
import { Prisma } from '../generated/prisma/index.js';

export async function getAllUsers() {
  return await findAllUsers();
}

export async function getUser(userId) {
  return await findUserById(userId);
}

export async function updateUser(userId, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  try {
    return await updateUserById(userId, data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const error = new Error('Email has already been used');
        error.status = 409;
        throw error;
      }
      throw error;
    }
  }
}

export async function deleteUser(userId) {
  return await remove(userId);
}

export async function getPostsByUser(userId) {
  return await findPostsByUser(userId);
}

export async function updateUserRole(userId, role) {
  const updatedUser = await updateRole(userId, role);
  if (updatedUser) return updatedUser;
  else {
    const error = new Error(`Cannot find user with id ${userId}`);
    error.status = 404;
    throw error;
  }
}
