import * as eventService from '../services/eventService.js';

// GET /events/host
export async function getCurrentUserEventsHandler(req, res) {
  let id = parseInt(req.user.id);
  let host = await eventService.getCurrentUserEvents(id);
  res.status(200).json(host);
}
