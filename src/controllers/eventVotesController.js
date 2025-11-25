import { getVotesByEvent } from '../services/voteService.js';

export async function getEventVotesHandler(req, res) {
  const eventId = req.params.eventId;
  const votes = await getVotesByEvent(eventId);
  res.status(200).json(votes);
}
