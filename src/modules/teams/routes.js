const express = require('express');
const router = express.Router();
const service = require('./service');

router.get('/', async (req, res) => {
  try {
    const teams = await service.getAllTeams();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await service.getTeamById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const team = await service.createTeam(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const team = await service.updateTeam(req.params.id, req.body);
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;