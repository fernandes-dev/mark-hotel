import { randomUUID } from 'crypto'

import { HashService } from '../../../../services/hash/implementations/HashService'
import { database } from '../database'

export async function seedUsers() {
  const hashService = new HashService()

  const hashedPassword = await hashService.hash('1234')

  console.time('seed user')
  await database.users.create({
    data: {
      email: `admin${randomUUID()}@admin.com`,
      name: 'Eduardo Fernandes',
      password: hashedPassword,
    },
  })
  console.timeEnd('seed user')
}
