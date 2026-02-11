require('dotenv').config();
const PrismaPg = require('@prisma/adapter-pg').PrismaPg;
const PrismaClient = require('../generated/prisma/client.js').PrismaClient;

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

module.exports = prisma