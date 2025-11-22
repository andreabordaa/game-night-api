import prisma from '../config/db.js';

// GET /events/host
export async function findCurrentUserEvents(id) {
  return await prisma.event.findMany({ where: { hostId: id } });
}

// GET /events/:id
export async function findById(id) {
  return await prisma.event.findUnique({ where: { id } });
}

// POST /events/
export async function create(event) {
  const newEvent = await prisma.event.create({
    data: event,
  });
  return newEvent;
}

// PUT /events/:id
export async function update(id, updates) {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updates,
    });
    return updatedEvent;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

// DELETE /events/:id
export async function remove(id) {
  try {
    const deletedEvent = await prisma.event.delete({
      where: { id },
    });
    return deletedEvent;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

// POST /events/:id/join
export async function findEvent(id) {
  const joinedEvent = await prisma.event.findUnique({
    where: { id },
    include: { attendees: true },
  });

  return joinedEvent;
}

export async function join(eventId, userId) {
  const joinedUser = await prisma.event.update({
    where: { id: eventId },
    data: {
      attendees: {
        connect: { id: userId },
      },
    },
    include: { attendees: true },
  });

  return joinedUser;
}
