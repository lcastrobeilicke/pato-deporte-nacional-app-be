const express = require('express');
const router = express.Router();
const service = require('./service');

router.get('/', async (req, res) => {
  try {
    const tournaments = await service.getAllTournaments();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tournament = await service.getTournamentById(req.params.id);
    if (!tournament) return res.status(404).json({ error: 'Tournament not found' });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const tournament = await service.createTournament(req.body);
    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const tournament = await service.updateTournament(req.params.id, req.body);
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;