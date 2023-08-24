import { clearDatabase } from '../tests/clearDatabase'
import { seedHotelsAndRooms } from './hotelsAndRoms.seed'
import { seedUsers } from './users.seed'

async function seedDatabase() {
  await clearDatabase()

  await seedUsers()

  await seedHotelsAndRooms()
}

seedDatabase().catch((err) => console.log('error seeding database', err))
