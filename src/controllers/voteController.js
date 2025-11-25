import {
  // getAllGames,
  getVoteById,
  createVote,
  updateVote,
  eventCountVotes,
  gameCountVotes,
  deleteVote,
  getAllVotedGameAndEventIds,
} from '../services/voteService.js';
// GET /vote/host
export async function getAllVotesHandler(req, res) {
    let vote = await getAllVotedGameAndEventIds();
    res.status(200).json(vote);
}


export async function getVoteByIdHandler(req, res) {
  let id = req.params.id;
  let game = await getVoteById(id);
  res.status(200).json(game);
}

export async function createVoteHandler(req, res) {
  const data = {
    userId: req.user.id,
    gameId: req.body.gameId,
    eventId: req.body.eventId,
  };
  let newVote = await createVote(data);
  res.status(201).json(newVote);
}

export async function updateVoteHandler(req, res) {
    const id = req.params.id;
    const updates = {};

    // Only allow updating gameId and/or eventId
    if (req.body.gameId) updates.gameId = req.body.gameId;
    if (req.body.eventId) updates.eventId = req.body.eventId;    
    
    const updatedVote = await updateVote(id, updates);
    res.status(200).json(updatedVote);

}
export async function deleteVoteHandler(req, res) {
  let id = req.params.id;
  await deleteGame(id);
  res.status(204).send();
}

export async function getAllVotedGameAndEventIdsHandler(req, res) {
  try {
    const result = await getAllVotedGameAndEventIds();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch voted game and event IDs' });
  }
}
