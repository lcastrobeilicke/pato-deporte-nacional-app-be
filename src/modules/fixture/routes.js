const express = require('express');
const router = express.Router();
const service = require('./service');

// GET /fixture?tournamentId=1
router.get('/', async (req, res) => {
  try {
    const { tournamentId } = req.query;
    if (!tournamentId) return res.status(400).json({ error: 'tournamentId is required' });
    const fixture = await service.getFixtureByTournament(tournamentId);
    res.json(fixture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /fixture/slots/:id
router.get('/slots/:id', async (req, res) => {
  try {
    const slot = await service.getSlotById(req.params.id);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /fixture/rounds
router.post('/rounds', async (req, res) => {
  try {
    const round = await service.createRound(req.body);
    res.status(201).json(round);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /fixture/slots
router.post('/slots', async (req, res) => {
  try {
    const slot = await service.createSlot(req.body);
    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;