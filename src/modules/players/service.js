const repo = require('./repository');

const createPlayer = (data) => repo.create(data);
const getAllPlayers = () => repo.findAll();
const getPlayerById = (id) => repo.findById(Number(id));
const updatePlayer = (id, data) => repo.update(Number(id), data);

module.exports = { createPlayer, getAllPlayers, getPlayerById, updatePlayer };