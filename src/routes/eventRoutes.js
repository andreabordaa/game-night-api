import express from 'express';
import * as eventController from '../controllers/eventController.js';

const router = express.Router();

router.get('/host', eventController.getCurrentUserEventsHandler);

export default router;
