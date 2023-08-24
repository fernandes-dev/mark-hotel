import { PrismaClient } from '@prisma/client'

const database_url =
  process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DOCKER

const database = new PrismaClient({
  datasources: {
    db: { url: database_url },
  },
})

export { database }
