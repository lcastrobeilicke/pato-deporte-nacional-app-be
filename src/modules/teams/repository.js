const prisma = require('../../prisma');

const create = (data) => prisma.team.create({ data });

const findAll = () => prisma.team.findMany();

const findById = (id) => prisma.team.findUnique({
  where: { id },
  include: { tournamentTeams: true }
});

const update = (id, data) => prisma.team.update({ where: { id }, data });

module.exports = { create, findAll, findById, update };