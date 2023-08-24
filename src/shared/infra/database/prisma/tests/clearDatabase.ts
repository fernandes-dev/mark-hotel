import { database } from '../database'

export async function clearDatabase() {
  if (process.env.NODE_ENV !== 'test') throw new Error('cannot clear database')

  await database.$transaction([
    database.hotel_address.deleteMany(),
    database.hotel_rooms.deleteMany(),
    database.bookings.deleteMany(),
  ])

  await database.$transaction([
    database.users.deleteMany(),
    database.hotels.deleteMany(),
  ])
}
