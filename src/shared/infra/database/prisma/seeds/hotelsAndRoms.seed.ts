import { randomUUID } from 'crypto'

import { Hotel } from '../../../../../modules/hotels/entities/Hotel'
import { database } from '../database'

const HOTELS_COUNT = 2
const ROOMS_COUNT = 10

export async function seedHotelsAndRooms() {
  const hotels: Hotel[] = []

  console.time('seed hotels')
  for (let index = 0; index < HOTELS_COUNT; index++) {
    const hotel = await database.hotels.create({
      data: {
        name: `mark_hotel_${randomUUID()}`,
        rooms_available: ROOMS_COUNT / 2,
        rooms_booked: ROOMS_COUNT / 2,
      },
    })

    hotels.push(hotel)
  }
  console.timeEnd('seed hotels')

  console.time('seed rooms')
  for (const hotel of hotels) {
    for (let index = 0; index < ROOMS_COUNT; index++) {
      await database.hotel_rooms.create({
        data: {
          number: index,
          price: index + 10,
          hotel_id: hotel.id,
          status: index % 2 === 0 ? 'AVAILABLE' : 'UNAVAILABLE',
        },
      })
    }
  }
  console.timeEnd('seed rooms')
}
