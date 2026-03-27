const express = require('express');
const router = express.Router();
const service = require('./service');

router.get('/', async (req, res) => {
  try {
    const players = await service.getAllPlayers();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await service.getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const player = await service.createPlayer(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const player = await service.updatePlayer(req.params.id, req.body);
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;