import { randomUUID } from 'crypto'
import supertest from 'supertest'

import { database } from '../../../../shared/infra/database/prisma/database'
import { clearDatabase } from '../../../../shared/infra/database/prisma/tests/clearDatabase'
import { app } from '../../../../shared/infra/http/express/app'
import { Hotel } from '../../../hotels/entities/Hotel'

describe('list hotel rooms controller', () => {
  let hotel: Hotel
  const HOTEL_ROOMS_COUNT = 10

  beforeAll(async () => {
    await clearDatabase()

    hotel = await database.hotels.create({
      data: {
        name: `mark_hotel_${randomUUID()}`,
        rooms_available: 10,
        rooms_booked: 10,
      },
    })

    for (let index = 0; index < HOTEL_ROOMS_COUNT; index++) {
      await database.hotel_rooms.create({
        data: {
          number: index,
          price: (index + 1) * 10,
          hotel_id: hotel.id,
        },
      })
    }
  })

  it(' should be able to list hotel rooms', async () => {
    const response = await supertest(app).get(`/book/${hotel.id}`)

    expect(response.status).toBe(200)
  })
})
