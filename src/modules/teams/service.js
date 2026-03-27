const repo = require('./repository');

const createTeam = (data) => repo.create(data);
const getAllTeams = () => repo.findAll();
const getTeamById = (id) => repo.findById(Number(id));
const updateTeam = (id, data) => repo.update(Number(id), data);

module.exports = { createTeam, getAllTeams, getTeamById, updateTeam };