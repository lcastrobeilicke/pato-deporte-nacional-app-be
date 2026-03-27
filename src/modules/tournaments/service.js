const repo = require('./repository');

const createTournament = (data) => repo.create(data);
const getAllTournaments = () => repo.findAll();
const getTournamentById = (id) => repo.findById(Number(id));
const updateTournament = (id, data) => repo.update(Number(id), data);

module.exports = { createTournament, getAllTournaments, getTournamentById, updateTournament };