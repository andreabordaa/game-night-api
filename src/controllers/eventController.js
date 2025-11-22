import * as eventService from '../services/eventService.js';

// GET /events/host
export async function getCurrentUserEventsHandler(req, res) {
  let id = req.user.id;
  let host = await eventService.getCurrentUserEvents(id);
  res.status(200).json(host);
}

// GET /events/:id
export async function getEventByIdHandler(req, res) {
  let id = req.params.id;
  let event = await eventService.getEventById(id);
  res.status(200).json(event);
}

// POST /events/
export async function createEventHandler(req, res) {
  const data = {
    name: req.body.name,
    location: req.body.location,
    eventDate: req.body.eventDate,
    description: req.body.description,

    hostId: req.user.id,
  };

  let newEvent = await eventService.createEvent(data);
  res.status(201).json(newEvent);
}

// PUT /events/:id
export async function updateEventHandler(req, res) {
  let id = req.params.id;

  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.location) updates.location = req.body.location;
  if (req.body.eventDate) updates.eventDate = req.body.eventDate;
  if (req.body.description) updates.description = req.body.description;

  const updatedEvent = await eventService.updateEvent(id, updates);
  res.status(200).json(updatedEvent);
}

// DELETE /events/:id
export async function deleteEventHandler(req, res) {
  let id = req.params.id;
  await eventService.deleteEvent(id);
  res.status(204).send();
}

// POST /events/:id/join
export async function joinEventHandler(req, res) {
  let eventId = req.params.id;
  let userId = req.user.id;
  await eventService.joinEvent(eventId, userId);
  res.status(200).json({ message: 'Successfully joined event.' });
}
