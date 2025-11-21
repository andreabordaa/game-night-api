import prisma from '../config/db.js';

export async function findCurrentUserEvents(id) {
  return await prisma.event.findMany({ where: { hostId: id } });
}
