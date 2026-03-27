const repo = require('./repository');

const createRound = (data) => repo.createRound(data);
const createSlot = (data) => repo.createSlot(data);
const getFixtureByTournament = (tournamentId) => repo.findRoundsByTournament(Number(tournamentId));
const getSlotById = (id) => repo.findSlotById(Number(id));

module.exports = { createRound, createSlot, getFixtureByTournament, getSlotById };