import { getEventById } from '../services/eventService.js';

export async function authorizeOwnership(req, res, next) {
  try {
    const eventId = req.params.id;
    const event = await getEventById(eventId);

    if (event.hostId !== req.user.id) {
      const error = new Error('Forbidden: insufficient permission');
      error.status = 403;
      return next(error);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}
