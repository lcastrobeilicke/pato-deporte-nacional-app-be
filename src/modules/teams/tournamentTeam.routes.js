const express = require('express');
const router = express.Router();
const service = require('./tournamentTeam.service');

// GET /tournament-teams?tournamentId=1
router.get('/', async (req, res) => {
  try {
    const { tournamentId } = req.query;
    if (!tournamentId) return res.status(400).json({ error: 'tournamentId is required' });
    const teams = await service.getTeamsByTournament(tournamentId);
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /tournament-teams/:id
router.get('/:id', async (req, res) => {
  try {
    const team = await service.getTournamentTeamById(req.params.id);
    if (!team) return res.status(404).json({ error: 'Tournament team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tournament-teams
router.post('/', async (req, res) => {
  try {
    const team = await service.createTournamentTeam(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tournament-teams/:id/members
router.post('/:id/members', async (req, res) => {
  try {
    const { playerId, role } = req.body;
    const member = await service.addMember(req.params.id, playerId, role);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /tournament-teams/:id/members/:playerId
router.delete('/:id/members/:playerId', async (req, res) => {
  try {
    await service.removeMember(req.params.id, req.params.playerId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;