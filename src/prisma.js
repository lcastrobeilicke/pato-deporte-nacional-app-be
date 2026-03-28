require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

let prisma;

if (!global.prisma) {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  global.prisma = new PrismaClient({ adapter });
}

prisma = global.prisma;

module.exports = prisma;