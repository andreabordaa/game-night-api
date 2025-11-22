import * as eventRepo from '../repositories/eventRepo.js';

// GET /events/host
export async function getCurrentUserEvents(id) {
  return await eventRepo.findCurrentUserEvents(id);
}

// GET /events/:id
export async function getEventById(id) {
  let result = await eventRepo.findById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find event with id ${id}`);
    error.status = 404;
    throw error;
  }
}

// POST /events/
export async function createEvent(data) {
  return await eventRepo.create(data);
}

// PUT /events/:id
export async function updateEvent(id, data) {
  const updatedEvent = await eventRepo.update(id, data);
  if (updatedEvent) return updatedEvent;
  else {
    const error = new Error(`Cannot find event with id ${id}`);
    error.status = 404;
    throw error;
  }
}

// DELETE /events/:id
export async function deleteEvent(id) {
  const result = await eventRepo.remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find event with id ${id}`);
    error.status = 404;
    throw error;
  }
}

// POST /events/:id/join
export async function joinEvent(eventId, userId) {
  const event = await eventRepo.findEvent(eventId);

  if (!event) {
    const error = new Error(`Cannot find event with id ${eventId}`);
    error.status = 404;
    throw error;
  }

  const alreadyJoined = event.attendees.some(
    (attendee) => attendee.id === userId,
  );
  if (alreadyJoined) {
    const error = new Error('Already joined event');
    error.status = 409;
    throw error;
  }

  return await eventRepo.join(eventId, userId);
}
