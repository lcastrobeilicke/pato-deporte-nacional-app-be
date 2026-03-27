const prisma = require('../../prisma');

const create = (data) => prisma.match.create({ data });

const findById = (id) => prisma.match.findUnique({
  where: { id },
  include: {
    fixtureSlot: true,
    winnerTeam: true,
  }
});

const findByTournament = (tournamentId) => prisma.match.findMany({
  where: { tournamentId },
  include: {
    fixtureSlot: true,
    winnerTeam: true,
  }
});

const updateScore = (id, teamAScore, teamBScore, winnerTeamId) =>
  prisma.match.update({
    where: { id },
    data: {
      teamAScore,
      teamBScore,
      winnerTeamId,
      status: 'finished',
      playedAt: new Date(),
    }
  });

const upsertTeamStatus = (tournamentId, tournamentTeamId, status) =>
  prisma.teamTournamentStatus.upsert({
    where: { tournamentTeamId },
    update: { status },
    create: { tournamentId, tournamentTeamId, status },
  });

module.exports = { create, findById, findByTournament, updateScore, upsertTeamStatus };