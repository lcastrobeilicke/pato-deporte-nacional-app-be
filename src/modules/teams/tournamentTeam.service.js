const repo = require('./tournamentTeam.repository');
const prisma = require('../../prisma');

const createTournamentTeam = (data) => repo.create(data);
const getTeamsByTournament = (tournamentId) => repo.findByTournament(Number(tournamentId));
const getTournamentTeamById = (id) => repo.findById(Number(id));
const removeMember = (tournamentTeamId, playerId) => repo.removeMember(Number(tournamentTeamId), Number(playerId));

const addMember = async (tournamentTeamId, playerId, role) => {
  const currentMembers = await prisma.tournamentTeamMember.count({
    where: { tournamentTeamId: Number(tournamentTeamId) }
  });

  if (currentMembers >= 4) {
    throw new Error('El equipo ya tiene el máximo de 4 jugadores');
  }

  return repo.addMember(Number(tournamentTeamId), Number(playerId), role);
};

module.exports = { createTournamentTeam, getTeamsByTournament, getTournamentTeamById, addMember, removeMember };