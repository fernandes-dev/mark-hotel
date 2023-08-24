import { randomUUID } from 'crypto'
import supertest from 'supertest'

import { database } from '../../../../shared/infra/database/prisma/database'
import { app } from '../../../../shared/infra/http/express/app'
import { HashService } from '../../../../shared/services/hash/implementations/HashService'
import { Hotel } from '../../entities/Hotel'
import { HotelAddress } from '../../entities/HotelAdress'

describe('update hotel controller', () => {
  const user = {
    email: `eduardo.yugan${randomUUID()}@gmail.com`,
    name: 'Eduardo Fernandes',
    password: '1234',
  }

  const hashService = new HashService()

  let hotel: Hotel
  let hotelAddress: HotelAddress

  beforeAll(async () => {
    await database.$transaction([
      database.hotel_address.deleteMany(),
      database.hotel_rooms.deleteMany(),
      database.bookings.deleteMany(),
    ])
    await database.$transaction([
      database.users.deleteMany(),
      database.hotels.deleteMany(),
    ])

    const hashedPassword = await hashService.hash(user.password)

    await database.users.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    })
  })

  beforeEach(async () => {
    hotel = await database.hotels.create({
      data: {
        name: `mark_hotel_${randomUUID()}`,
        rooms_available: 10,
        rooms_booked: 10,
      },
    })

    hotelAddress = await database.hotel_address.create({
      data: {
        country: 'Brazil',
        street: '25 de Março',
        zipcode: '00000-000',
        hotel_id: hotel.id,
      },
    })
  })

  it(' should be able to update a hotel and address', async () => {
    const loginResponse = await supertest(app).post('/users/login').send({
      email: user.email,
      password: user.password,
    })

    expect(loginResponse.body.token).toBeDefined()

    const data = {
      address: {
        country: 'Argentina',
        zipcode: '00000-001',
      },
      name: 'Mark Hotel_' + randomUUID(),
      rooms_available: 1,
      rooms_booked: 4,
    }

    const response = await supertest(app)
      .put(`/hotels/${hotel.id}`)
      .auth(loginResponse.body.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(200)

    const updatedHotel = response.body

    expect(updatedHotel.hotel.rooms_available).toBe(data.rooms_available)
    expect(updatedHotel.hotel.rooms_booked).toBe(data.rooms_booked)
    expect(updatedHotel.hotel.name).toBe(data.name)

    expect(updatedHotel.hotel_address.country).not.toBe(hotelAddress.country)
    expect(updatedHotel.hotel_address.street).toBe(hotelAddress.street)
    expect(updatedHotel.hotel_address.zipcode).not.toBe(hotelAddress.zipcode)
    expect(updatedHotel.hotel_address.id).toBe(hotelAddress.id)
  })
})
