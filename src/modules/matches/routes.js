const express = require('express');
const router = express.Router();
const service = require('./service');

// GET /matches?tournamentId=1
router.get('/', async (req, res) => {
  try {
    const { tournamentId } = req.query;
    if (!tournamentId) return res.status(400).json({ error: 'tournamentId is required' });
    const matches = await service.getMatchesByTournament(tournamentId);
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /matches/:id
router.get('/:id', async (req, res) => {
  try {
    const match = await service.getMatchById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /matches
router.post('/', async (req, res) => {
  try {
    const match = await service.createMatch(req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /matches/:id/score
router.patch('/:id/score', async (req, res) => {
  try {
    const match = await service.updateScore(req.params.id, req.body);
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;