import * as eventRepo from '../repositories/eventRepo.js';

export async function getCurrentUserEvents(id) {
  return await eventRepo.findCurrentUserEvents(id);
}
