import { randomUUID } from 'crypto'
import supertest from 'supertest'

import { database } from '../../../../shared/infra/database/prisma/database'
import { app } from '../../../../shared/infra/http/express/app'
import { HashService } from '../../../../shared/services/hash/implementations/HashService'

describe('create hotel controller', () => {
  const user = {
    email: `eduardo.yugan${randomUUID()}@gmail.com`,
    name: 'Eduardo Fernandes',
    password: '1234',
  }

  const hashService = new HashService()

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

  it(' should be able to create a hotel and address', async () => {
    const data = {
      address: {
        country: 'Brazil',
        street: '25 de Março',
        zipcode: '00000-000',
      },
      name: 'Mark Hotel_' + randomUUID(),
      rooms_available: 10,
      rooms_booked: 5,
    }

    const loginResponse = await supertest(app).post('/users/login').send({
      email: user.email,
      password: user.password,
    })

    expect(loginResponse.body.token).toBeDefined()

    const response = await supertest(app)
      .post('/hotels')
      .auth(loginResponse.body.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(201)

    const foundHotel = await database.hotels.findFirst({
      where: { name: data.name },
    })

    expect(foundHotel.rooms_available).toBe(data.rooms_available)
    expect(foundHotel.rooms_booked).toBe(data.rooms_booked)
    expect(foundHotel.name).toBe(data.name)
  })
})
