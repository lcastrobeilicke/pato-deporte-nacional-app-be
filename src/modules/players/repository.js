const prisma = require('../../prisma');

const create = (data) => prisma.player.create({ data });

const findAll = () => prisma.player.findMany();

const findById = (id) => prisma.player.findUnique({
  where: { id },
  include: { tournamentTeamMembers: true }
});

const update = (id, data) => prisma.player.update({ where: { id }, data });

module.exports = { create, findAll, findById, update };