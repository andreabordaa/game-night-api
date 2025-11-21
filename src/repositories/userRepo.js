import prisma from '../config/db.js';

export async function createUser(data) {
  return await prisma.user.create({ data: data, omit: { password: true } });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function findAllUsers() {
  return await prisma.user.findMany({
    omit: { password: true },
  });
}

export async function findUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
}

export async function updateUserById(id, updates) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updates,
      omit: { password: true },
    });
    return updatedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function updateRole(userId, role) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      omit: { password: true },
    });
    return updatedUser;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
