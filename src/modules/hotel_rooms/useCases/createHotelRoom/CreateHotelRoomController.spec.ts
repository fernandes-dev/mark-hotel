import { randomUUID } from 'crypto'
import supertest from 'supertest'

import { database } from '../../../../shared/infra/database/prisma/database'
import { app } from '../../../../shared/infra/http/express/app'
import { HashService } from '../../../../shared/services/hash/implementations/HashService'
import { Hotel } from '../../../hotels/entities/Hotel'

describe('create hotel room controller', () => {
  const user = {
    email: `eduardo.yugan${randomUUID()}@gmail.com`,
    name: 'Eduardo Fernandes',
    password: '1234',
  }

  const hashService = new HashService()

  let hotel: Hotel

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
        name: 'Mark Hotel_' + randomUUID(),
        rooms_available: 10,
        rooms_booked: 5,
      },
    })
  })

  it(' should be able to create a hotel room', async () => {
    const loginResponse = await supertest(app).post('/users/login').send({
      email: user.email,
      password: user.password,
    })

    expect(loginResponse.body.token).toBeDefined()

    const data = {
      hotel_id: hotel.id,
      number: 10,
      price: 50,
      status: 'AVAILABLE',
    }

    const response = await supertest(app)
      .post(`/hotels/${hotel.id}/rooms`)
      .auth(loginResponse.body.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(201)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('number')
    expect(response.body).toHaveProperty('price')
    expect(response.body).toHaveProperty('status')
    expect(response.body).toHaveProperty('hotel_id')
    expect(response.body).toHaveProperty('created_at')
    expect(response.body).toHaveProperty('updated_at')
    expect(response.body.number).toBe(data.number)
    expect(response.body.status).toBe(data.status)
    expect(response.body.hotel_id).toBe(data.hotel_id)
  })
})
