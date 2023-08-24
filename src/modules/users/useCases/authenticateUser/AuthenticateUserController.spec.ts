import { randomUUID } from 'crypto'
import supertest from 'supertest'

import { database } from '../../../../shared/infra/database/prisma/database'
import { app } from '../../../../shared/infra/http/express/app'

describe('authenticate user controller', () => {
  beforeAll(async () => {
    await database.users.deleteMany()
  })

  it(' should be able to authenticate user', async () => {
    const user = {
      name: 'Eduardo Fernandes',
      email: `eduardo.yugan${randomUUID()}@gmail.com`,
      password: '1234',
    }

    const response = await supertest(app).post('/users').send(user)

    expect(response.status).toBe(201)

    const foundUser = await database.users.findUnique({
      where: { email: user.email },
    })

    expect(foundUser.password).not.toBe(user.password)

    const authResponse = await supertest(app)
      .post('/users/login')
      .send({ email: user.email, password: user.password })

    expect(authResponse.status).toBe(200)
    expect(authResponse.body.token).toBeDefined()
  })
})
