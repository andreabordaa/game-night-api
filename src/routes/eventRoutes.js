import express from 'express';
import * as eventController from '../controllers/eventController.js';
import * as eventValidator from '../middleware/eventValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/host', authenticate, eventController.getCurrentUserEventsHandler);
router.get(
  '/:id',
  eventValidator.validateEventId,
  authenticate,
  eventController.getEventByIdHandler,
);

router.post(
  '/',
  authenticate,
  eventValidator.validateCreateEvent,
  eventController.createEventHandler,
);
router.put(
  '/:id',
  eventValidator.validateEventId,
  authenticate,
  authorizeOwnership,
  eventValidator.validateUpdateEvent,
  eventController.updateEventHandler,
);
router.delete(
  '/:id',
  eventValidator.validateEventId,
  authenticate,
  authorizeOwnership,
  eventController.deleteEventHandler,
);

router.post(
  '/:id/join',
  eventValidator.validateEventId,
  authenticate,
  eventController.joinEventHandler,
);

router.get(
  '/:id/votes',
  eventValidator.validateEventId,
  authenticate,
  async (req, res) => {
    const { getVotesByEvent } = await import('../services/voteService.js');
    const eventId = req.params.id;
    const votes = await getVotesByEvent(eventId);
    res.status(200).json(votes);
  },
);

export default router;
