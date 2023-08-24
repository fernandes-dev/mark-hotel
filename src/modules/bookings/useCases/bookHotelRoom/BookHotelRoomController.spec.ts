import { randomUUID } from 'crypto'
import supertest from 'supertest'

import { database } from '../../../../shared/infra/database/prisma/database'
import { app } from '../../../../shared/infra/http/express/app'
import { HotelRoom } from '../../../hotel_rooms/entities/HotelRoom'
import { Hotel } from '../../../hotels/entities/Hotel'

describe('book hotel rooms controller', () => {
  let hotel: Hotel
  let hotelRoom: HotelRoom

  let currentDate = new Date()

  beforeEach(async () => {
    currentDate = new Date()

    hotel = await database.hotels.create({
      data: {
        name: `mark_hotel_${randomUUID()}`,
        rooms_available: 10,
        rooms_booked: 10,
      },
    })

    hotelRoom = await database.hotel_rooms.create({
      data: {
        number: 101,
        hotel_id: hotel.id,
        status: 'AVAILABLE',
        price: 10,
      },
    })
  })

  it(' should be able to send book event and book hotel room', async () => {
    const tomorrow = new Date(currentDate)

    tomorrow.setDate(tomorrow.getDate() + 1)

    const response = await supertest(app)
      .post(`/book/${hotel.id}`)
      .send({
        room_number: hotelRoom.number,
        start_date: currentDate.toISOString(),
        end_date: tomorrow.toISOString(),
        client_email: `eduardo.yugan${randomUUID()}@gmail.com`,
      })
    expect(response.status).toBe(200)

    await new Promise((resolve) => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        resolve(true)
      }, 1000)
    })

    const foundBook = await database.bookings.findFirst({
      where: {
        hotel_room_id: hotelRoom.id,
      },
    })

    expect(foundBook?.id).toBeDefined()
  })
})
