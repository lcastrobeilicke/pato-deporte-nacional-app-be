const prisma = require('../../prisma');

const createRound = (data) => prisma.fixtureRound.create({ data });

const createSlot = (data) => prisma.fixtureSlot.create({ data });

const findRoundsByTournament = (tournamentId) => prisma.fixtureRound.findMany({
  where: { tournamentId },
  include: {
    slots: {
      include: {
        teamAAssigned: true,
        teamBAssigned: true,
        teamASourceSlot: true,
        teamBSourceSlot: true,
        match: true,
      }
    }
  },
  orderBy: { roundNumber: 'asc' }
});

const findSlotById = (id) => prisma.fixtureSlot.findUnique({
  where: { id },
  include: {
    teamAAssigned: true,
    teamBAssigned: true,
    teamASourceSlot: true,
    teamBSourceSlot: true,
    match: true,
  }
});

module.exports = { createRound, createSlot, findRoundsByTournament, findSlotById };