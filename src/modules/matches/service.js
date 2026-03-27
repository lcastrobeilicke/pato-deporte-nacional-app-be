const repo = require('./repository');
const prisma = require('../../prisma');

const createMatch = (data) => repo.create(data);
const getMatchById = (id) => repo.findById(Number(id));
const getMatchesByTournament = (tournamentId) => repo.findByTournament(Number(tournamentId));

const updateScore = async (id, { teamAScore, teamBScore }) => {
  // 1. Traer el match con el slot
  const match = await prisma.match.findUnique({
    where: { id: Number(id) },
    include: { fixtureSlot: true }
  });

  if (!match) throw new Error('Match not found');

  const slot = match.fixtureSlot;

  // 2. Determinar ganador y perdedor
  const winnerTeamId = teamAScore > teamBScore
    ? slot.teamAAssignedId
    : slot.teamBAssignedId;

  const loserTeamId = teamAScore > teamBScore
    ? slot.teamBAssignedId
    : slot.teamAAssignedId;

  // 3. Actualizar el score
  const updated = await repo.updateScore(Number(id), teamAScore, teamBScore, winnerTeamId);

  // 4. Actualizar status según la copa del round
  const round = await prisma.fixtureRound.findUnique({
    where: { id: slot.fixtureRoundId }
  });

  if (round.cup === 'initial') {
    await repo.upsertTeamStatus(match.tournamentId, winnerTeamId, 'active_gold');
    await repo.upsertTeamStatus(match.tournamentId, loserTeamId, 'active_silver');
  } else if (round.cup === 'silver') {
    await repo.upsertTeamStatus(match.tournamentId, loserTeamId, 'eliminated');
    await repo.upsertTeamStatus(match.tournamentId, winnerTeamId, 'active_silver');
  } else if (round.cup === 'gold' && round.phase === 'final') {
    await repo.upsertTeamStatus(match.tournamentId, winnerTeamId, 'champion_gold');
    await repo.upsertTeamStatus(match.tournamentId, loserTeamId, 'active_silver');
  } else if (round.cup === 'silver' && round.phase === 'final') {
    await repo.upsertTeamStatus(match.tournamentId, winnerTeamId, 'champion_silver');
    await repo.upsertTeamStatus(match.tournamentId, loserTeamId, 'eliminated');
  }

  return updated;
};

module.exports = { createMatch, getMatchById, getMatchesByTournament, updateScore };