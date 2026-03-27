const prisma = require('../../prisma');

const create = (data) => prisma.tournament.create({ data });

const findAll = () => prisma.tournament.findMany();

const findById = (id) => prisma.tournament.findUnique({
  where: { id },
  include: {
    tournamentTeams: true,
    fixtureRounds: true,
  }
});

const update = (id, data) => prisma.tournament.update({ where: { id }, data });

module.exports = { create, findAll, findById, update };