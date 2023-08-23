import { users } from '@prisma/client'

export class User implements users {
  id: number
  name: string
  email: string
  password: string
}
