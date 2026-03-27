const prisma = require('../../prisma');

const create = (data) => prisma.tournamentTeam.create({ data });

const findByTournament = (tournamentId) => prisma.tournamentTeam.findMany({
  where: { tournamentId },
  include: {
    team: true,
    members: {
      include: { player: true }
    },
    status: true  // ← agregá esto
  }
});

const findById = (id) => prisma.tournamentTeam.findUnique({
  where: { id },
  include: {
    team: true,
    members: {
      include: { player: true }
    },
    status: true  // ← y esto
  }
});

const addMember = (tournamentTeamId, playerId, role = 'player') =>
  prisma.tournamentTeamMember.create({
    data: { tournamentTeamId, playerId, role }
  });

const removeMember = (tournamentTeamId, playerId) =>
  prisma.tournamentTeamMember.deleteMany({
    where: { tournamentTeamId, playerId }
  });

module.exports = { create, findByTournament, findById, addMember, removeMember };