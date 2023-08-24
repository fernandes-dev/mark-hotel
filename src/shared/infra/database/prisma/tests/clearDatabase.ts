import { database } from '../database'

export async function clearDatabase() {
  if (process.env.NODE_ENV !== 'test') throw new Error('cannot clear database')

  await database.bookings.deleteMany()
  await Promise.all([
    database.hotel_rooms.deleteMany(),
    database.hotel_address.deleteMany(),
  ])

  await Promise.all([database.hotels.deleteMany(), database.users.deleteMany()])
}
